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

  describe('problem view', function() {
    it('問題番号を含んだタイトルがある', function() {
      var view = learnjs.problemView('1');
      expect(view.text()).toEqual('Problem #1 Coming soon!');
    });
  });
});