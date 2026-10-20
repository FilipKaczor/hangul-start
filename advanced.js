/* Rozszerzone sylaby, słowa i liczby */
var syllableMode = "basic";
var advancedFilter = "all";
var advancedChoice = { c: 0, v: 0, f: 1 };

const MEDIAL_INDEX = {'ㅏ':0,'ㅐ':1,'ㅑ':2,'ㅒ':3,'ㅓ':4,'ㅔ':5,'ㅕ':6,'ㅖ':7,'ㅗ':8,'ㅘ':9,'ㅙ':10,'ㅚ':11,'ㅛ':12,'ㅜ':13,'ㅝ':14,'ㅞ':15,'ㅟ':16,'ㅠ':17,'ㅡ':18,'ㅢ':19,'ㅣ':20};
const FINAL_JAMO = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const FINAL_ROMAN = {'':'','ㄱ':'k','ㄲ':'k','ㄳ':'k','ㄴ':'n','ㄵ':'n','ㄶ':'n','ㄷ':'t','ㄹ':'l','ㄺ':'k','ㄻ':'m','ㄼ':'l','ㄽ':'l','ㄾ':'l','ㄿ':'p','ㅀ':'l','ㅁ':'m','ㅂ':'p','ㅄ':'p','ㅅ':'t','ㅆ':'t','ㅇ':'ng','ㅈ':'t','ㅊ':'t','ㅋ':'k','ㅌ':'t','ㅍ':'p','ㅎ':'t'};
const INITIAL_ROMAN = ['k','n','t','r','m','p','s','','ch',"ch'", "k'", "t'", "p'",'h'];
const INITIAL_JAMO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const MEDIAL_JAMO = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];

const CHALLENGE_ITEMS = [
  {char:'학생',roman:'haksaeng',translation:'uczeń, student',note:'학 ma 3 elementy: ㅎ + ㅏ + ㄱ; 생 ma 3.',group:'Słowa'},
  {char:'학교',roman:'hakkyo',translation:'szkoła',note:'학 ma końcową spółgłoskę ㄱ.',group:'Słowa'},
  {char:'한국',roman:"Han'guk",translation:'Korea',note:'Obie sylaby mają spółgłoskę końcową.',group:'Słowa'},
  {char:'한국어',roman:"Han'gugŏ",translation:'język koreański',note:'Końcowe ㄱ łączy się z samogłoską w 어.',group:'Słowa'},
  {char:'공책',roman:"kongch'aek",translation:'zeszyt',note:'Obie sylaby kończą się spółgłoską.',group:'Słowa'},
  {char:'선생님',roman:'sŏnsaengnim',translation:'nauczyciel, nauczycielka',note:'Końcówka 님 jest grzecznościowa.',group:'Słowa'},
  {char:'친구',roman:"ch'in'gu",translation:'przyjaciel, przyjaciółka',note:'W przybliżeniu: chin-gu.',group:'Słowa'},
  {char:'음식',roman:'ŭmsik',translation:'jedzenie, potrawa',note:'Obie sylaby mają spółgłoskę końcową.',group:'Słowa'},
  {char:'날씨',roman:'nalssi',translation:'pogoda',note:'Sylaba 날 ma końcowe ㄹ.',group:'Słowa'},
  {char:'과일',roman:'kwail',translation:'owoc',note:'Zawiera samogłoskę złożoną ㅘ.',group:'Słowa'},
  {char:'의자',roman:'ŭija',translation:'krzesło',note:'Zawiera ㅢ, zapisywane w MR jako ŭi.',group:'Słowa'},
  {char:'회사',roman:'hoesa',translation:'firma',note:'Zawiera samogłoskę ㅚ.',group:'Słowa'},
  {char:'삶',roman:'sam',translation:'życie',note:'Złożona końcówka ㄻ; w tej sylabie brzmi jak m.',group:'Słowa'},
  {char:'값',roman:'kap',translation:'cena, wartość',note:'Złożona końcówka ㅄ; w izolacji brzmi jak p.',group:'Słowa'},
  {char:'닭',roman:'tak',translation:'kurczak',note:'Złożona końcówka ㄺ; w izolacji brzmi jak k.',group:'Słowa'},
  {char:'몫',roman:'mok',translation:'udział, część',note:'Złożona końcówka ㄳ; w izolacji brzmi jak k.',group:'Słowa'},
  {char:'읽다',roman:'iktta',translation:'czytać',note:'Sylaba 읽 zawiera cztery elementy: ㅇ + ㅣ + ㄹ + ㄱ.',group:'Słowa'},
  {char:'없어요',roman:'ŏpsŏyo',translation:'nie ma; nie istnieje',note:'없 zawiera złożoną końcówkę ㅄ.',group:'Słowa'},
  {char:'안녕하세요',roman:'annyŏnghaseyo',translation:'dzień dobry; cześć',note:'Grzeczne powitanie.',group:'Słowa'},
  {char:'괜찮아요',roman:"kwaench'anayo",translation:'w porządku; nic nie szkodzi',note:'Zawiera ㅙ i złożoną końcówkę ㄶ.',group:'Słowa'}
];
const NUMBER_ITEMS = [
  {char:'영',roman:'yŏng',translation:'0 · zero (sino-koreańska)',note:'Liczby sino-koreańskie stosuje się m.in. w datach, minutach, cenach i numerach telefonu.',group:'Liczby'},
  {char:'일',roman:'il',translation:'1 (sino-koreańska)',note:'Sino-koreański system liczenia: daty, minuty, ceny i numery telefonu.',group:'Liczby'},
  {char:'이',roman:'i',translation:'2 (sino-koreańska)',note:'Sino-koreański system liczenia: daty, minuty, ceny i numery telefonu.',group:'Liczby'},
  {char:'삼',roman:'sam',translation:'3 (sino-koreańska)',note:'Sino-koreański system liczenia: daty, minuty, ceny i numery telefonu.',group:'Liczby'},
  {char:'사',roman:'sa',translation:'4 (sino-koreańska)',note:'Sino-koreański system liczenia: daty, minuty, ceny i numery telefonu.',group:'Liczby'},
  {char:'오',roman:'o',translation:'5 (sino-koreańska)',note:'Sino-koreański system liczenia: daty, minuty, ceny i numery telefonu.',group:'Liczby'},
  {char:'육',roman:'yuk',translation:'6 (sino-koreańska)',note:'Sino-koreański system liczenia: daty, minuty, ceny i numery telefonu.',group:'Liczby'},
  {char:'칠',roman:"ch'il",translation:'7 (sino-koreańska)',note:'Sino-koreański system liczenia: daty, minuty, ceny i numery telefonu.',group:'Liczby'},
  {char:'팔',roman:"p'al",translation:'8 (sino-koreańska)',note:'Sino-koreański system liczenia: daty, minuty, ceny i numery telefonu.',group:'Liczby'},
  {char:'구',roman:'ku',translation:'9 (sino-koreańska)',note:'Sino-koreański system liczenia: daty, minuty, ceny i numery telefonu.',group:'Liczby'},
  {char:'십',roman:'sip',translation:'10 (sino-koreańska)',note:'Sino-koreański system liczenia: daty, minuty, ceny i numery telefonu.',group:'Liczby'},
  {char:'하나',roman:'hana',translation:'1 (rodzima koreańska)',note:'Rodzime liczby służą m.in. do liczenia rzeczy i podawania godzin.',group:'Liczby'},
  {char:'둘',roman:'tul',translation:'2 (rodzima koreańska)',note:'Rodzime liczby służą m.in. do liczenia rzeczy i podawania godzin.',group:'Liczby'},
  {char:'셋',roman:'set',translation:'3 (rodzima koreańska)',note:'Rodzime liczby służą m.in. do liczenia rzeczy i podawania godzin.',group:'Liczby'},
  {char:'넷',roman:'net',translation:'4 (rodzima koreańska)',note:'Rodzime liczby służą m.in. do liczenia rzeczy i podawania godzin.',group:'Liczby'},
  {char:'다섯',roman:'tasŏt',translation:'5 (rodzima koreańska)',note:'Rodzime liczby służą m.in. do liczenia rzeczy i podawania godzin.',group:'Liczby'},
  {char:'여섯',roman:'yŏsŏt',translation:'6 (rodzima koreańska)',note:'Rodzime liczby służą m.in. do liczenia rzeczy i podawania godzin.',group:'Liczby'},
  {char:'일곱',roman:'ilgop',translation:'7 (rodzima koreańska)',note:'Rodzime liczby służą m.in. do liczenia rzeczy i podawania godzin.',group:'Liczby'},
  {char:'여덟',roman:'yŏdŏl',translation:'8 (rodzima koreańska)',note:'Rodzime liczby służą m.in. do liczenia rzeczy i podawania godzin.',group:'Liczby'},
  {char:'아홉',roman:'ahop',translation:'9 (rodzima koreańska)',note:'Rodzime liczby służą m.in. do liczenia rzeczy i podawania godzin.',group:'Liczby'},
  {char:'열',roman:'yŏl',translation:'10 (rodzima koreańska)',note:'Rodzime liczby służą m.in. do liczenia rzeczy i podawania godzin.',group:'Liczby'}
];
const ALL_CHALLENGES = CHALLENGE_ITEMS.concat(NUMBER_ITEMS).map(item => ({...item,name:item.translation,kind:item.group}));

compose = function(ci, vi, fi) {
  if (fi === undefined) fi = 0;
  const initial = [0,2,3,5,6,7,9,11,12,14,15,16,17,18];
  const medial = MEDIAL_INDEX[VOWELS[vi][0]];
  return String.fromCharCode(0xAC00 + initial[ci] * 588 + medial * 28 + fi);
};
allSyllables = function() {
  return CONSONANTS.flatMap((c, ci) => VOWELS.map((v, vi) => ({
    char: compose(ci, vi),
    roman: syllableRoman(ci, vi),
    name: c[0] + ' + ' + v[0],
    kind: 'sylaba'
  })));
};
function blockParts(char) {
  const code = char.charCodeAt(0) - 0xAC00;
  if (code < 0 || code > 11171) return [char];
  const initial = Math.floor(code / 588);
  const medial = Math.floor((code % 588) / 28);
  const final = code % 28;
  const parts = [INITIAL_JAMO[initial],MEDIAL_JAMO[medial]];
  if (final) Array.from(FINAL_JAMO[final]).forEach(part => parts.push(part));
  return parts;
}
function makeAdvancedBlock() {
  const c = CONSONANTS[advancedChoice.c][0];
  const vowel = VOWELS[advancedChoice.v][0];
  const ending = FINAL_JAMO[advancedChoice.f];
  const char = compose(advancedChoice.c,advancedChoice.v,advancedChoice.f);
  const roman = INITIAL_ROMAN[advancedChoice.c] + VOWELS[advancedChoice.v][1] + (FINAL_ROMAN[ending] || '');
  const parts = blockParts(char);
  const endingNote = ending.length > 1
    ? 'Złożona końcówka. Jej wymowa zależy od słowa i następnej sylaby.'
    : 'Końcowa spółgłoska to 받침 (batchim). W słowach może łączyć się z następną sylabą.';
  return "<div class='syllable-builder advanced-builder'>" +
    "<div class='builder-column'><p class='builder-label'>1 · Spółgłoska początkowa</p><div class='builder-choices'>" +
    CONSONANTS.map((x,i)=>"<button class='builder-choice "+(i===advancedChoice.c?'selected':'')+"' data-adv-c='"+i+"'>"+x[0]+"</button>").join('') +
    "</div></div><div class='builder-column'><p class='builder-label'>2 · Samogłoska</p><div class='builder-choices'>" +
    VOWELS.map((x,i)=>"<button class='builder-choice "+(i===advancedChoice.v?'selected':'')+"' data-adv-v='"+i+"' title='"+esc(x[1])+"'>"+x[0]+"</button>").join('') +
    "</div></div><div class='builder-column builder-final'><p class='builder-label'>3 · Końcówka sylaby</p><div class='builder-choices final-choices'>" +
    FINAL_JAMO.map((x,i)=>"<button class='builder-choice "+(i===advancedChoice.f?'selected':'')+"' data-adv-f='"+i+"' title='"+(x||'bez końcówki')+"'>"+(x||'∅')+"</button>").join('') +
    "</div></div><div class='builder-output'><div class='output-char'>"+char+"</div><div class='output-rom'>"+esc(roman||VOWELS[advancedChoice.v][1])+"</div>" +
    "<div class='advanced-parts'>"+parts.map(esc).join(' + ')+" <span>· "+parts.length+" element"+(parts.length===2?'y':'y')+"</span></div><span class='study-name'>"+endingNote+"</span></div></div>";
}
function isInMyWords(item) {
  return state.words.some(word => word.hangul === item.char);
}
function advancedWordCard(item,index) {
  const added=isInMyWords(item);
  const breakdown=item.char.split('').map(char=>"<span class='complex-syllable'><b>"+esc(char)+"</b><small>"+blockParts(char).map(esc).join(' + ')+"</small></span>").join('');
  return "<article class='advanced-word-card'><div class='advanced-word-top'><span class='advanced-hangul'>"+esc(item.char)+"</span><span class='advanced-group'>"+esc(item.group)+"</span></div>" +
    "<div class='advanced-roman'>"+esc(item.roman)+"</div><div class='advanced-meaning'>"+esc(item.translation)+"</div><div class='advanced-breakdown'>"+breakdown+"</div><p class='advanced-note'>"+esc(item.note)+"</p>" +
    "<button class='btn "+(added?'btn-soft':'btn-outline')+" add-advanced-word' data-add-advanced='"+index+"' "+(added?'disabled':'')+">"+(added?'✓ W moich słówkach':'＋ Dodaj do moich słówek')+"</button></article>";
}
function advancedSyllablesContent() {
  const items=advancedFilter==='all'?ALL_CHALLENGES:ALL_CHALLENGES.filter(item=>item.group===advancedFilter);
  return "<div class='panel'><div class='panel-heading'><h2>Zbuduj trudniejszą sylabę</h2><span>2, 3 lub 4 elementy</span></div>"+makeAdvancedBlock()+
    "<div class='hint'>Blok składa się z początkowej spółgłoski, samogłoski i opcjonalnej końcówki. Złożone końcówki dają 4 elementy. Romanizacja bloku jest orientacyjna; słowa poniżej mają zapis wymowy w McCune–Reischauer.</div></div>" +
    "<div class='panel wide-panel'><div class='panel-heading'><h2>Quiz, słowa i liczby</h2><span>znaczenia w spisie</span></div><div class='segmented advanced-filters'>" +
    "<button class='"+(advancedFilter==='all'?'active':'')+"' data-advanced-filter='all'>Wszystko</button><button class='"+(advancedFilter==='Słowa'?'active':'')+"' data-advanced-filter='Słowa'>Słowa</button><button class='"+(advancedFilter==='Liczby'?'active':'')+"' data-advanced-filter='Liczby'>Liczby</button></div>" +
    "<div class='advanced-word-grid'>"+items.map(item=>advancedWordCard(item,ALL_CHALLENGES.indexOf(item))).join('')+"</div></div>" +
    "<div class='hint'>McCune–Reischauer: ㅢ zapisuję jako ŭi (czasem upraszczane do ui), a ㅝ jako wŏ (czasem upraszczane do wo).</div>";
}
syllablePage = function() {
  const c=CONSONANTS[syllableChoice.c],v=VOWELS[syllableChoice.v];
  const char=compose(syllableChoice.c,syllableChoice.v),roman=syllableRoman(syllableChoice.c,syllableChoice.v);
  const samples=[[0,0],[2,0],[6,0],[11,6],[0,9],[4,6],[7,0],[3,4]];
  const startButton=quiz?'':"<button class='btn btn-primary' id='"+(syllableMode==='advanced'?'start-advanced-quiz':'start-syllable-quiz')+"'>✦ "+(syllableMode==='advanced'?'Quiz 20 słów i liczb':'Quiz 20 sylab')+"</button>";
  const tabs="<div class='segmented syllable-mode-tabs'><button class='"+(syllableMode==='basic'?'active':'')+"' data-syllable-mode='basic'>Budowanie sylab</button><button class='"+(syllableMode==='advanced'?'active':'')+"' data-syllable-mode='advanced'>Trudniejsze sylaby i liczby</button></div>";
  const basic="<div class='panel'><div class='panel-heading'><h2>Zbuduj sylabę</h2><span>spółgłoska + samogłoska</span></div><div class='syllable-builder'><div class='builder-column'><p class='builder-label'>1 · Spółgłoska</p><div class='builder-choices'>"+
    CONSONANTS.map((x,i)=>"<button class='builder-choice "+(i===syllableChoice.c?'selected':'')+"' data-cons='"+i+"' title='"+esc(x[1])+"'>"+x[0]+"</button>").join('')+
    "</div></div><div class='builder-column'><p class='builder-label'>2 · Samogłoska</p><div class='builder-choices'>"+
    VOWELS.map((x,i)=>"<button class='builder-choice "+(i===syllableChoice.v?'selected':'')+"' data-vow='"+i+"' title='"+esc(x[1])+"'>"+x[0]+"</button>").join('')+
    "</div></div><div class='builder-output'><div class='output-char'>"+char+"</div><div class='output-rom'>"+esc(roman)+"</div><span class='study-name'>spółgłoska + samogłoska</span></div></div><div class='hint'>ㅇ na początku bloku jest nieme przed samogłoską. Samogłoski pionowe ustawia się po prawej, poziome pod spółgłoską.</div></div>" +
    "<div class='panel wide-panel'><div class='panel-heading'><h2>Przykładowe sylaby</h2><span>Kliknij, aby zbudować</span></div><div class='syllable-samples'>"+
    samples.map(([ci,vi])=>"<button class='sample-chip' data-sample='"+ci+","+vi+"'><b>"+compose(ci,vi)+"</b><span>"+esc(syllableRoman(ci,vi))+"</span></button>").join('')+
    "</div></div><details class='panel wide-panel'><summary style='cursor:pointer;font:700 14px Manrope'>Pełny spis sylab <span style='float:right;color:#999;font:10px DM Sans'>"+allSyllables().length+" kombinacji · rozwiń</span></summary><div class='syllable-reference'>"+
    allSyllables().map(x=>"<div><b>"+x.char+"</b><span>"+esc(x.roman)+"</span></div>").join('')+
    "</div></details><div class='panel wide-panel'><div class='panel-heading'><h2>Jak powstaje blok?</h2><span>Hangul zapisuje się w kwadratowych blokach</span></div><div class='basic-output'>"+c[0]+" + "+v[0]+" = <b>"+char+"</b> <span>"+esc(roman)+"</span></div></div>";
  return "<div class='page-head'><div><div class='eyebrow'>CZYTANIE PO KOREAŃSKU</div><h1 class='page-title'>Sylaby</h1><p class='page-subtitle'>Ćwicz proste kombinacje oraz trudniejsze bloki i prawdziwe słowa. Quiz losuje 20 sylab albo słów i liczb.</p></div>"+startButton+"</div>"+tabs+(quiz?quizMarkup():syllableMode==='advanced'?advancedSyllablesContent():basic);
};

quizMarkup = function() {
  const q=quiz;
  if(q.done&&!q.reviewStage) return "<div class='panel quiz-panel result-summary'><div class='eyebrow'>QUIZ ZAKOŃCZONY</div><div class='big-result'>"+q.score+"/"+q.total+"</div><h2>"+(q.score===q.total?'Świetna robota!':'Sprawdźmy jeszcze trudniejsze elementy')+"</h2><p>"+(q.missed.length?q.missed.length+' elementów trafiło do powtórki.':'Wszystkie odpowiedzi poprawne — nic nie trafia do powtórki.')+"</p><button class='btn btn-primary' id='go-review' "+(q.missed.length?'':'disabled')+">Przejdź do powtórki →</button> <button class='btn btn-outline' id='exit-quiz'>Wróć do "+(q.kind==='advanced'?'trudniejszych sylab':q.kind==='syllables'?'sylab':'alfabetu')+"</button></div>";
  if(q.done&&q.reviewStage) return "<div class='page-head'><div><div class='eyebrow'>ETAP 2 · MATERIAŁ DO POWTÓRKI</div><h1 class='page-title'>Przejdź jeszcze raz</h1><p class='page-subtitle'>Oto elementy, które warto powtórzyć. Znaczenia słów są widoczne w tej powtórce.</p></div></div><div class='panel'><div class='panel-heading'><h2>Do powtórki</h2><span>"+q.missed.length+" elementów</span></div><div class='word-list'>"+q.missed.map(reviewCard).join('')+"</div><div class='study-actions' style='justify-content:center'><button class='btn btn-primary' id='retry-missed'>Quiz z tych elementów →</button><button class='btn btn-outline' id='exit-quiz'>Zakończ powtórkę</button></div></div>";
  const item=q.items[q.index],advanced=q.kind==='advanced',syllables=q.kind==='syllables';
  const prompt=advanced?'ten element':syllables?'tę sylabę':'ten znak';
  const heading=advanced?'Rozpoznaj słowo lub liczbę':syllables?'Rozpoznaj sylabę':'Rozpoznaj znak';
  const footer=advanced?'20 losowych słów i liczb':syllables?'20 losowych sylab':'Wszystkie '+ALL.length+' znaki';
  return "<div class='panel quiz-panel'><div class='panel-heading'><h2>"+heading+"</h2><span>"+(q.index+1)+" z "+q.total+"</span></div><div class='quiz-progress'><div style='width:"+(q.index/q.total*100)+"%'></div></div><div class='quiz-prompt'><div class='quiz-char'>"+esc(item.char)+"</div><div class='quiz-question'>Jak czytamy "+prompt+"?</div></div><div class='quiz-options'>"+
    item.options.map(x=>"<button class='quiz-option' data-answer='"+esc(x)+"' "+(q.answered?'disabled':'')+">"+esc(x)+"</button>").join('')+
    "</div><div class='quiz-action-row'><button class='btn btn-outline' data-answer='__unknown__' "+(q.answered?'disabled':'')+">Nie wiem — dodaj do powtórki</button><button class='btn btn-soft' id='mark-for-review' "+(q.missed.some(x=>x.char===item.char)?'disabled':'')+">"+(q.missed.some(x=>x.char===item.char)?'✓ Dodano do powtórki':'＋ Dodaj do powtórki')+"</button></div><div class='feedback'>"+(q.feedback||'Wybierz poprawną transkrypcję.')+"</div><div class='quiz-footer'><span>"+footer+"</span><button class='btn btn-primary' id='quiz-next' "+(q.answered?'':'disabled')+">"+(q.index===q.total-1?'Zakończ quiz':'Dalej →')+"</button></div></div>";
};

document.addEventListener('click',function(event) {
  const target=event.target.closest('button');
  if(!target) return;
  if(target.dataset.syllableMode) { syllableMode=target.dataset.syllableMode; quiz=null; render(); return; }
  if(target.dataset.advancedFilter) { advancedFilter=target.dataset.advancedFilter; render(); return; }
  if(target.hasAttribute('data-adv-c')) { advancedChoice.c=Number(target.dataset.advC); render(); return; }
  if(target.hasAttribute('data-adv-v')) { advancedChoice.v=Number(target.dataset.advV); render(); return; }
  if(target.hasAttribute('data-adv-f')) { advancedChoice.f=Number(target.dataset.advF); render(); return; }
  if(target.id==='start-advanced-quiz') { startQuiz(ALL_CHALLENGES,'advanced',20,ALL_CHALLENGES); return; }
  if(target.hasAttribute('data-add-advanced')) {
    const item=ALL_CHALLENGES[Number(target.dataset.addAdvanced)];
    if(!item||isInMyWords(item)) return;
    state.words.unshift({id:'advanced-'+Date.now().toString(),hangul:item.char,roman:item.roman,translation:item.translation,note:item.note});
    persist();
    const count=document.getElementById('word-count');
    if(count) count.textContent=state.words.length;
    target.textContent='✓ W moich słówkach';
    target.classList.remove('btn-outline');
    target.classList.add('btn-soft');
    target.disabled=true;
    toast('Dodano do Twoich słówek ✦');
  }
});
render();