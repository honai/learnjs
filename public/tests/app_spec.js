describe('LearnJS', function() {
  it('問題のページを表示できる', function() {
    learnjs.showView('#problem-1');
    expect($('.view-container .problem-view').length).toEqual(1);
  });

  it('ハッシュがないときはランディングページを表示する', function() {
    learnjs.showView('');
    expect($('.view-container .landing-view').length).toEqual(1);
  });

  it('ハッシュのパラメータをview関数に投げる', function() {
    spyOn(learnjs, 'problemView');
    learnjs.showView('#problem-42');
    expect(learnjs.problemView).toHaveBeenCalledWith('42');
  });

  it('読み込み完了したらルーターを呼び出す', function() {
    spyOn(learnjs, 'showView');
    learnjs.appOnReady();
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });

  it('ハッシュの変化に反応する', function() {
    learnjs.appOnReady();
    spyOn(learnjs, 'showView');
    $(window).trigger('hashchange');
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });

  describe('problem view', function() {
    var view;
    beforeEach(function() {
      view = learnjs.problemView('1');
    });

    it('問題番号を含んだタイトルを表示できる', function() {
      expect(view.find('.title').text()).toEqual('Problem #1');
    });

    it('説明文を表示できる', function() {
      expect(view.find('[data-name="description"]').text()).toEqual('What is truth?');
    });

    it('問題のコードを表示できる', function() {
      expect(view.find('[data-name="code"]').text()).toEqual('function problem() { return __; }');
    });

    describe('answer section', function() {
      it('正解の判定', function() {
        view.find('.answer').val('true');
        view.find('.check-btn').click();
        expect(view.find('.result').text()).toEqual('Correct!');
      });

      it('不正解の判定', function() {
        view.find('.answer').val('false');
        view.find('.check-btn').click();
        expect(view.find('.result').text()).toEqual('Incorrect!');
      });
    });  
  });
});