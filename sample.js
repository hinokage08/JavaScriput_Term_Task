// ①DOMがすべて読み込まれた際に、引数に指定したfunctionを実行する
$(document).ready(function(){
  function score_indicate(){
    // このような記述をすることで、subject_pointsという変数の中に
    // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]という配列を作成できる。

    // ④id=#national_languageに入力されたvalue値を取得
    // ⑤()内の要素を文字列から数値に変換している
    let subject_points = [Number($('#national_language').val()),
                          Number($('#english').val()),
                          Number($('#mathematics').val()),
                          Number($('#science').val()),
                          Number($('#society').val())
                          ];

    // さらにこのような記述をすることで、「合計点：」となっている右の部分に合計点が出力される
    let sum = subject_points.reduce(function(a,b){
      return a + b;
    })
    // ⑥指定さてたidのテキスト情報を合計点に書き換える。
    $("#sum_indicate").text(sum);

    // ここに、上記を参考にして平均点を出力する処理を書き込む
    let ave = sum / subject_points.length;
   $("#average_indicate").text(ave);
  };

  function get_achievement(){
  // ここに、ランクの値の文字列（平均点が80点以上なら"A"、60点以上なら"B"、40点以上なら"C"、それ以下なら"D"）を出力する処理を書き込む
    let average = $('#average_indicate').text();
    Number(average);
    if(average >= 80){
      return "A";
    }
    else if(average >= 60){
      return "B";
    }
    else if(average >= 40){
      return "C";
    }
    else{
      return "D";
    }
  }

  function get_pass_or_failure(){
    // ここに、全ての教科が60点以上なら"合格"の文字列、一つでも60点未満の教科があったら"不合格"の文字列を出す処理を書き込む
    let subject_points = [Number($('#national_language').val()),
                          Number($('#english').val()),
                          Number($('#mathematics').val()),
                          Number($('#science').val()),
                          Number($('#society').val())
                          ];
    // 教科数を変数 subject_numberに格納
    let subject_number = $('input').length;
    let judge = "合格";
    for(let i=0; i<subject_number; i++){
      if(subject_points[i] < 60){
        judge = "不合格";
        break;
      }
    }
      return judge;
  }


  function judgement(){
    // ここに、「最終ジャッジ」のボタンを押したら「あなたの成績はAです。合格です」といった内容を出力する処理を書き込む
    // 下記の記述をすることで、「最終ジャッジ」のボタンを押すと「あなたの成績は（ここに「ランク」の値を入れる）です。（ここに「判定」の値を入れる）です」という文字の入った水色のフキダシが出力される処理が実装される。
    let rank = $('#evaluation').text();
    let pass_or_fail = $('#judge').text();
    // ⑦.appendは指定した要素内の最後に引数のコンテンツを追加するメソッド
    $('#alert-indicate').remove();
    $('#declaration').append(`<label id="alert-indicate" class="alert alert-info">あなたの成績は${rank}です。${pass_or_fail}です</label>`);
  };

    // ③指定したidの中身が変更された際にイベント処理を実行する
  $('#national_language, #english, #mathematics, #science, #society').change(function() {
    score_indicate();
  });
    // ②指定したid内をクリックするとイベント処理を実行する
  $('#btn-evaluation').click(function() {
    $('#evaluation').text(get_achievement());
  });

  $('#btn-judge').click(function() {
    $('#judge').text(get_pass_or_failure());
  });
  $('#btn-declaration').click(function() {
    judgement();
  });
});
// ここに書かれているjsの記述はあくまでヒントとして用意された雛形なので、書かれている記述に従わずに実装したいという場合は、自分の好きに実装して構わない。課題要件を満たし、コードの品質が一定の水準にあると判定されればどのような実装でも合格になる。
// 例ではJavaScriptとJqueryの両方の記述を使用しているが、どちらかに統一しても構わない
