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
    it('問題番号を含んだタイトルを表示できる', function() {
      var view = learnjs.problemView('1');
      expect(view.find('.title').text()).toEqual('Problem #1');
    });
  });
});