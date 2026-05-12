import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  :root {
    --terracota:#C4735A;--rose:#B85C6E;--cream:#FAF5F0;--cream-dark:#F0E8E0;
    --text:#3D2B1F;--text-light:#7A5C4E;--white:#FEFCFA;--brown-light:#9B7260;
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--text);}
  .app{max-width:430px;margin:0 auto;min-height:100vh;background:var(--white);}
  .header{background:linear-gradient(135deg,var(--terracota),var(--rose));padding:48px 24px 32px;position:relative;overflow:hidden;}
  .header::before{content:'';position:absolute;top:-40px;right:-40px;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,0.08);}
  .header-logo{font-family:'Cormorant Garamond',serif;font-size:13px;font-weight:300;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-bottom:6px;}
  .header-title{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:300;color:white;line-height:1.1;margin-bottom:4px;}
  .header-title em{font-style:italic;}
  .header-sub{font-size:13px;color:rgba(255,255,255,0.75);font-weight:300;}
  .header-badge{position:absolute;top:48px;right:24px;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.3);border-radius:20px;padding:8px 16px;text-align:center;}
  .header-badge .wn{font-family:'Cormorant Garamond',serif;font-size:26px;color:white;line-height:1;}
  .header-badge .wl{font-size:10px;color:rgba(255,255,255,0.8);letter-spacing:1px;text-transform:uppercase;}
  .phase-toggle{display:flex;border-bottom:2px solid var(--cream-dark);}
  .phase-btn{flex:1;padding:12px;font-size:13px;font-weight:500;cursor:pointer;border:none;background:white;color:var(--text-light);font-family:'DM Sans',sans-serif;border-bottom:2px solid transparent;margin-bottom:-2px;transition:all 0.2s;}
  .phase-btn.active{color:var(--terracota);border-bottom-color:var(--terracota);}
  .nav{display:flex;background:var(--white);border-bottom:1px solid var(--cream-dark);position:sticky;top:0;z-index:100;}
  .nav-item{flex:1;padding:12px 6px;text-align:center;cursor:pointer;font-size:10px;color:var(--text-light);border-bottom:2px solid transparent;background:none;border-top:none;border-left:none;border-right:none;transition:all 0.2s;font-family:'DM Sans',sans-serif;}
  .nav-item.active{color:var(--terracota);border-bottom-color:var(--terracota);font-weight:500;}
  .nav-icon{display:block;font-size:17px;margin-bottom:3px;}
  .content{padding:24px 20px 100px;}
  .card{background:var(--white);border:1px solid var(--cream-dark);border-radius:16px;padding:20px;margin-bottom:14px;}
  .card-t{background:linear-gradient(135deg,#FDF0EB,#FAE8E0);border-color:#EDD5C8;}
  .card-r{background:linear-gradient(135deg,#FDF0F3,#F9E4E8);border-color:#EDD0D6;}
  .card-g{background:linear-gradient(135deg,#F0F7F1,#E4F0E6);border-color:#C8DDC9;}
  .card-red{background:linear-gradient(135deg,#FDF0F0,#FAE4E4);border-color:#EDD0D0;}
  .ctitle{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;color:var(--text);margin-bottom:6px;line-height:1.2;}
  .csub{font-size:11px;color:var(--text-light);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px;}
  .ctext{font-size:14px;color:var(--text-light);line-height:1.7;}
  .stitle{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;color:var(--text);margin-bottom:4px;}
  .ssub{font-size:12px;color:var(--text-light);margin-bottom:20px;}
  .baby-card{background:linear-gradient(135deg,var(--terracota),var(--rose));border-radius:20px;padding:24px;margin-bottom:20px;color:white;position:relative;overflow:hidden;}
  .baby-emoji{font-size:52px;margin-bottom:8px;display:block;}
  .baby-label{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.75);margin-bottom:4px;}
  .baby-size{font-family:'Cormorant Garamond',serif;font-size:22px;color:white;line-height:1.3;}
  .baby-cm{font-size:12px;color:rgba(255,255,255,0.65);margin-top:4px;}
  .sw-sel{display:flex;align-items:center;gap:16px;margin-bottom:20px;background:var(--cream);border-radius:14px;padding:16px 20px;}
  .sw-label{font-size:13px;color:var(--text-light);flex:1;}
  .sw-ctrl{display:flex;align-items:center;gap:12px;}
  .sw-btn{width:32px;height:32px;border-radius:50%;border:1px solid var(--cream-dark);background:white;color:var(--terracota);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;}
  .sw-btn:hover{background:var(--terracota);color:white;}
  .sw-num{font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--text);min-width:40px;text-align:center;}
  .trim-tabs{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;}
  .trim-tab{flex:1;padding:10px 6px;border-radius:10px;border:1.5px solid var(--cream-dark);background:white;font-size:11px;color:var(--text-light);cursor:pointer;text-align:center;transition:all 0.2s;font-family:'DM Sans',sans-serif;white-space:nowrap;}
  .trim-tab.active{background:linear-gradient(135deg,var(--terracota),var(--rose));border-color:transparent;color:white;font-weight:500;}
  .sint-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
  .sint-item{background:var(--cream);border:1.5px solid transparent;border-radius:12px;padding:12px;cursor:pointer;transition:all 0.2s;text-align:center;}
  .sint-item.sel{background:#FDF0EB;border-color:var(--terracota);}
  .sint-emoji{font-size:22px;display:block;margin-bottom:4px;}
  .sint-label{font-size:12px;color:var(--text-light);}
  .sint-item.sel .sint-label{color:var(--terracota);font-weight:500;}
  .dica-box{background:linear-gradient(135deg,#FDF5F0,#FAF0F3);border:1px solid #EDD8D0;border-radius:14px;padding:16px;margin-bottom:16px;animation:fadeIn 0.3s ease;}
  .dica-titulo{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--terracota);margin-bottom:8px;font-weight:500;}
  .dica-texto{font-size:13px;color:var(--text);line-height:1.7;}
  .dica-juliana{font-size:12px;color:var(--rose);margin-top:8px;font-style:italic;}
  .alerta-box{background:linear-gradient(135deg,#FDF0F0,#FAE4E4);border:1.5px solid #E8C0C0;border-radius:14px;padding:16px;margin-bottom:16px;}
  .alerta-titulo{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#C0404040;margin-bottom:10px;font-weight:500;color:#B85050;}
  .alerta-item{display:flex;align-items:flex-start;gap:8px;padding:8px 0;font-size:13px;color:#8B3030;border-bottom:1px solid #F0D0D0;line-height:1.5;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:translateY(0);}}
  .nut-item{display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid var(--cream-dark);}
  .nut-dot{width:8px;height:8px;border-radius:50%;background:var(--terracota);flex-shrink:0;}
  .nut-nome{font-size:14px;font-weight:500;color:var(--text);margin-bottom:2px;}
  .nut-motivo{font-size:12px;color:var(--text-light);}
  .check-item{display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid var(--cream-dark);cursor:pointer;}
  .check-box{width:22px;height:22px;border-radius:6px;border:1.5px solid var(--cream-dark);display:flex;align-items:center;justify-content:center;transition:all 0.2s;flex-shrink:0;}
  .check-box.on{background:var(--terracota);border-color:var(--terracota);color:white;font-size:12px;}
  .check-label{font-size:14px;color:var(--text);}
  .check-label.on{color:var(--text-light);text-decoration:line-through;}
  .rec-card{background:var(--white);border:1px solid var(--cream-dark);border-radius:16px;padding:20px;margin-bottom:12px;cursor:pointer;transition:all 0.2s;}
  .rec-card:hover{border-color:var(--terracota);}
  .rec-card.open{border-color:var(--terracota);}
  .rec-header{display:flex;align-items:center;justify-content:space-between;}
  .rec-emoji{font-size:28px;margin-right:12px;}
  .rec-nome{font-family:'Cormorant Garamond',serif;font-size:18px;color:var(--text);}
  .rec-tag{font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--terracota);margin-top:2px;}
  .rec-arrow{color:var(--text-light);font-size:18px;transition:transform 0.2s;}
  .rec-card.open .rec-arrow{transform:rotate(90deg);}
  .rec-body{margin-top:16px;padding-top:16px;border-top:1px solid var(--cream-dark);}
  .rec-stitle{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-light);margin-bottom:8px;margin-top:14px;}
  .rec-ing{font-size:13px;color:var(--text);line-height:1.8;white-space:pre-line;}
  .rec-prep{font-size:13px;color:var(--text-light);line-height:1.8;}
  .rec-ben{font-size:12px;color:var(--terracota);font-style:italic;margin-top:10px;line-height:1.6;}
  .mito-item{border-radius:14px;border:1px solid var(--cream-dark);overflow:hidden;margin-bottom:10px;}
  .mito-q{padding:16px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-size:14px;color:var(--text);font-weight:500;background:white;}
  .mito-r{padding:12px 16px 16px;font-size:13px;color:var(--text-light);line-height:1.7;background:var(--cream);border-top:1px solid var(--cream-dark);}
  .diario-carta{background:linear-gradient(160deg,#FDF5F0,#FAF0F3);border:1px solid #EDD8D0;border-radius:16px;padding:24px;margin-bottom:16px;}
  .diario-data{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--terracota);margin-bottom:8px;}
  .diario-intro{font-family:'Cormorant Garamond',serif;font-size:18px;font-style:italic;color:var(--text);margin-bottom:16px;line-height:1.5;}
  .diario-ta{width:100%;border:none;background:rgba(255,255,255,0.6);border-radius:10px;padding:14px;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--text);line-height:1.7;resize:none;outline:none;min-height:100px;}
  .diario-ta::placeholder{color:var(--text-light);opacity:0.6;}
  .diario-btn{margin-top:12px;background:var(--terracota);color:white;border:none;border-radius:10px;padding:12px 24px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;width:100%;}
  .humor-grid{display:flex;gap:8px;margin-bottom:20px;}
  .humor-btn{flex:1;padding:12px 6px;border-radius:12px;border:1.5px solid var(--cream-dark);background:white;cursor:pointer;text-align:center;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
  .humor-btn .em{font-size:22px;display:block;margin-bottom:4px;}
  .humor-btn .lb{font-size:11px;color:var(--text-light);}
  .humor-btn.sel{border-color:var(--terracota);background:#FDF0EB;}
  .mem-item{display:flex;align-items:flex-start;gap:14px;padding:16px 0;border-bottom:1px solid var(--cream-dark);}
  .mem-icon{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--terracota),var(--rose));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
  .mem-inp{border:none;border-bottom:1px solid var(--cream-dark);background:transparent;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--text-light);width:100%;padding:4px 0;outline:none;}
  .mem-inp::placeholder{color:#C0A090;}
  .cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:12px;}
  .cal-hdr{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:6px;}
  .cal-hd{text-align:center;font-size:10px;color:var(--text-light);}
  .cal-day{aspect-ratio:1;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;cursor:pointer;border:1.5px solid transparent;background:var(--cream);color:var(--text-light);transition:all 0.2s;position:relative;}
  .cal-day.today{border-color:var(--terracota);color:var(--terracota);font-weight:600;}
  .cal-day.marked{background:#FDF0EB;border-color:#EDD5C8;}
  .cal-day.marked::after{content:'●';position:absolute;bottom:2px;font-size:6px;color:var(--terracota);}
  .entry-item{background:var(--cream);border-radius:12px;padding:14px 16px;margin-bottom:10px;}
  .entry-wk{font-size:11px;color:var(--terracota);letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;}
  .entry-tx{font-size:13px;color:var(--text);line-height:1.6;}
  .diag-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;}
  .diag-chip{padding:10px 12px;border-radius:10px;border:1.5px solid var(--cream-dark);background:white;font-size:12px;color:var(--text-light);cursor:pointer;text-align:center;transition:all 0.2s;}
  .diag-chip.sel{background:#FDF0EB;border-color:var(--terracota);color:var(--terracota);font-weight:500;}
  .diag-chip.sel-red{background:#FDF0F0;border-color:#E8C0C0;color:#B85050;font-weight:500;}
  .tag-pill{display:inline-block;background:var(--cream-dark);color:var(--brown-light);border-radius:20px;padding:3px 10px;font-size:11px;margin:3px;}
  .setup-screen{min-height:100vh;background:linear-gradient(160deg,var(--terracota) 0%,var(--rose) 50%,#8B3A52 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;text-align:center;overflow-y:auto;}
  .setup-logo{font-family:'Cormorant Garamond',serif;font-size:56px;font-weight:300;color:white;margin-bottom:6px;letter-spacing:2px;}
  .setup-tagline{font-size:13px;color:rgba(255,255,255,0.7);letter-spacing:3px;text-transform:uppercase;margin-bottom:40px;}
  .setup-card{background:white;border-radius:24px;padding:32px 24px;width:100%;max-width:380px;text-align:left;}
  .setup-card h2{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:400;color:var(--text);margin-bottom:6px;}
  .setup-card p{font-size:13px;color:var(--text-light);margin-bottom:28px;line-height:1.6;}
  .setup-field{margin-bottom:18px;}
  .setup-label{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-light);margin-bottom:8px;display:block;}
  .setup-input{width:100%;border:1.5px solid var(--cream-dark);border-radius:12px;padding:12px 16px;font-family:'DM Sans',sans-serif;font-size:15px;color:var(--text);outline:none;background:var(--cream);transition:border-color 0.2s;}
  .setup-input:focus{border-color:var(--terracota);}
  .setup-radio-group{display:flex;gap:8px;flex-wrap:wrap;}
  .setup-radio{padding:10px 14px;border:1.5px solid var(--cream-dark);border-radius:10px;cursor:pointer;font-size:13px;color:var(--text-light);transition:all 0.2s;background:var(--cream);}
  .setup-radio.sel{background:#FDF0EB;border-color:var(--terracota);color:var(--terracota);font-weight:500;}
  .setup-btn{width:100%;background:linear-gradient(135deg,var(--terracota),var(--rose));color:white;border:none;border-radius:14px;padding:16px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;cursor:pointer;margin-top:8px;}
  .setup-btn:disabled{opacity:0.5;cursor:not-allowed;}
  .pp-nut-item{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--cream-dark);font-size:13px;color:var(--text);line-height:1.6;}
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────

const BABY_SIZES = {
  4:{f:"semente de papoula",e:"🌱",c:"0,1 cm"},5:{f:"semente de gergelim",e:"🌿",c:"0,2 cm"},
  6:{f:"lentilha",e:"🫘",c:"0,6 cm"},7:{f:"mirtilo",e:"🫐",c:"1,0 cm"},
  8:{f:"feijão",e:"🫘",c:"1,6 cm"},9:{f:"azeitona",e:"🫒",c:"2,3 cm"},
  10:{f:"morango",e:"🍓",c:"3,1 cm"},11:{f:"figo",e:"🍈",c:"4,1 cm"},
  12:{f:"limão",e:"🍋",c:"5,4 cm"},13:{f:"ervilha-torta",e:"🫛",c:"7,4 cm"},
  14:{f:"pêssego",e:"🍑",c:"8,7 cm"},15:{f:"maçã",e:"🍎",c:"10,1 cm"},
  16:{f:"abacate",e:"🥑",c:"11,6 cm"},17:{f:"pera",e:"🍐",c:"13,0 cm"},
  18:{f:"pimentão",e:"🫑",c:"14,2 cm"},19:{f:"manga",e:"🥭",c:"15,3 cm"},
  20:{f:"banana",e:"🍌",c:"16,4 cm"},21:{f:"cenoura",e:"🥕",c:"26,7 cm"},
  22:{f:"papaia",e:"🍈",c:"27,8 cm"},23:{f:"toranja",e:"🍊",c:"28,9 cm"},
  24:{f:"espiga de milho",e:"🌽",c:"30,0 cm"},25:{f:"couve-flor",e:"🥦",c:"34,6 cm"},
  26:{f:"alface",e:"🥬",c:"35,6 cm"},27:{f:"repolho",e:"🥬",c:"36,6 cm"},
  28:{f:"berinjela",e:"🍆",c:"37,6 cm"},29:{f:"abóbora pequena",e:"🎃",c:"38,6 cm"},
  30:{f:"pepino",e:"🥒",c:"39,9 cm"},31:{f:"coco",e:"🥥",c:"41,1 cm"},
  32:{f:"abacaxi",e:"🍍",c:"42,4 cm"},33:{f:"melão",e:"🍈",c:"43,7 cm"},
  34:{f:"melancia pequena",e:"🍉",c:"45,0 cm"},35:{f:"melancia",e:"🍉",c:"46,2 cm"},
  36:{f:"alface romana",e:"🥬",c:"47,4 cm"},37:{f:"acelga",e:"🥬",c:"48,6 cm"},
  38:{f:"abóbora",e:"🎃",c:"49,8 cm"},39:{f:"melancia grande",e:"🍉",c:"50,7 cm"},
  40:{f:"abóbora madura",e:"🎃",c:"51,2 cm"},
};

const TRIM_INFO = {
  1:{sem:"1 a 13",titulo:"O começo de tudo",desc:"Seu bebê está se formando célula por célula. O coração começa a bater por volta da semana 6. Um momento de grandes transformações — dentro e fora de você.",nuts:[{n:"Metilfolato",m:"Formação do tubo neural e DNA do bebê"},{n:"DHA",m:"Desenvolvimento cerebral inicial"},{n:"Ferro",m:"Expansão do volume sanguíneo materno"},{n:"Vitamina B12",m:"Síntese de mielina e divisão celular"},{n:"Zinco",m:"Proliferação celular e imunidade"}],alertas:["Sangramento intenso","Dor abdominal forte","Febre acima de 38°C","Vômitos que impedem alimentação"]},
  2:{sem:"14 a 26",titulo:"Ela está crescendo",desc:"O segundo trimestre costuma trazer mais energia. Seu bebê já ouve sua voz e começa a se mexer — uma sensação que você nunca vai esquecer.",nuts:[{n:"Cálcio",m:"Formação óssea e dentária do bebê"},{n:"Magnésio",m:"Relaxamento muscular e sono"},{n:"Vitamina D3",m:"Absorção de cálcio e imunidade"},{n:"Ômega-3",m:"Desenvolvimento ocular e cerebral"},{n:"Proteína",m:"Crescimento muscular fetal"}],alertas:["Pressão alta (acima de 140/90)","Inchaço súbito nas mãos e rosto","Diminuição dos movimentos fetais","Dor de cabeça intensa e persistente"]},
  3:{sem:"27 a 40",titulo:"A chegada se aproxima",desc:"O terceiro trimestre é de maturação. O bebê ganha peso, os pulmões se desenvolvem e você já pode sentir o mundo dele. Em breve, vocês se encontram.",nuts:[{n:"Ferro",m:"Reserva para o bebê após o nascimento"},{n:"Vitamina K2",m:"Coagulação e saúde óssea neonatal"},{n:"Colina",m:"Maturação cerebral e memória fetal"},{n:"Probióticos",m:"Microbiota do canal de parto"},{n:"Magnésio",m:"Prevenção de câimbras e contrações prematuras"}],alertas:["Contrações regulares antes da semana 37","Perda de líquido amniótico","Visão turva ou borrada","Movimentos fetais ausentes por mais de 12h"]},
};

const SINTOMAS = {
  1:[
    {e:"🤢",l:"Enjoo",d:"Mastigue um pedaço de gengibre fresco ao acordar. Consuma água gelada com fatias de limão em pequenos goles. Faça refeições pequenas e frequentes. Evite condimentos picantes, alimentos gordurosos e odores fortes. Não deite logo após comer.",j:"Converse com a Juliana sobre suplementação de vitamina B6 — pode fazer grande diferença no enjoo da gestação."},
    {e:"😴",l:"Sonolência",d:"Sono excessivo no 1º trimestre é normal — seu corpo está trabalhando muito! Aposte em proteína no café da manhã (ovo, cottage) para energia mais estável ao longo do dia.",j:"Se a fadiga for muito intensa, peça à Juliana avaliar seus níveis de ferro e B12."},
    {e:"🍋",l:"Acidez",d:"Fracione as refeições. Não deite após comer. Reduza café e frituras. Mastigar bem os alimentos ajuda muito na digestão.",j:"A Juliana pode indicar suplemento específico para equilibrar sua microbiota e reduzir a acidez."},
    {e:"😰",l:"Ansiedade",d:"Magnésio bisglicinato é um grande aliado para acalmar o sistema nervoso na gestação. Triptofano presente em bananas, ovos e sementes de abóbora também ajuda.",j:"Converse com a Juliana sobre magnésio na gestação — forma e dose importam muito."},
    {e:"😣",l:"Dor de cabeça",d:"Hidratação é fundamental — beba pelo menos 2L de água ao dia. Evite ficar longos períodos sem comer. Descanso é essencial.",j:"Se as dores forem frequentes, informe a Juliana e seu médico para avaliar pressão arterial."},
    {e:"💧",l:"Salivação excessiva",d:"Evite alimentos muito ácidos. Fracione as refeições. Gelo ou água gelada com limão podem ajudar.",j:"Pode estar relacionada à deficiência de B6 — mencione para a Juliana."},
  ],
  2:[
    {e:"🔥",l:"Refluxo",d:"Fracione as refeições em 5-6 vezes ao dia. Não deite até 2h após comer. Reduza café e alimentos ácidos. Azeite em pequena quantidade pode proteger a mucosa.",j:"A Juliana pode avaliar suplementação de probióticos para sua mucosa gástrica."},
    {e:"💤",l:"Insônia",d:"Magnésio à noite é ótimo aliado. Sementes de abóbora e banana no jantar favorecem a produção de melatonina. Evite telas 30 minutos antes de dormir. Banho quente ao final do dia melhora a qualidade do sono.",j:"Converse com a Juliana sobre magnésio bisglicinato — forma mais indicada na gestação."},
    {e:"🦵",l:"Câimbra",d:"Magnésio e cálcio são os principais envolvidos. Folhas verdes escuras e sementes de abóbora são fontes naturais. Hidrate-se bem ao longo do dia. Alongamentos suaves antes de dormir ajudam.",j:"A Juliana pode ajustar sua suplementação de magnésio para reduzir as câimbras."},
    {e:"😣",l:"Dor lombar",d:"Evite ficar muito tempo sentada. Inclua alimentos anti-inflamatórios: cúrcuma, azeite, gengibre, peixes. Alongamentos e caminhadas leves ajudam.",j:"Converse com a Juliana — pode ser necessário reforçar magnésio."},
    {e:"💧",l:"Inchaço",d:"Reduza sódio: embutidos, enlatados, temperos prontos. Aumente potássio: abacate e batata-doce. Eleve as pernas por 15-20 minutos ao dia. Descanse em decúbito lateral esquerdo — melhora o retorno venoso.",j:"Se o inchaço for súbito e nas mãos ou rosto, entre em contato imediato com seu médico e com a Juliana."},
    {e:"😊",l:"Bem-estar",d:"Que ótimo! Continue com alimentação variada e colorida, rica em antioxidantes. Esse é o trimestre de ouro — aproveite para fortalecer o corpo.",j:"Continue com os suplementos prescritos pela Juliana — eles fazem diferença nessa fase!"},
  ],
  3:[
    {e:"😮‍💨",l:"Falta de ar",d:"Normal no 3º trimestre — o bebê está maior. Refeições menores ajudam. Descanse com a cabeça levemente elevada.",j:"Se sentir falta de ar em repouso ou muito intensa, informe seu médico e a Juliana imediatamente."},
    {e:"🦵",l:"Câimbra",d:"Magnésio bisglicinato à noite é muito eficaz. Hidratação constante ao longo do dia. Alongamentos suaves antes de dormir.",j:"Peça à Juliana revisar sua suplementação de magnésio nessa fase final."},
    {e:"💧",l:"Inchaço",d:"Reduza sal e alimentos industrializados. Eleve as pernas por 15-20 minutos. Descanse em decúbito lateral esquerdo para melhorar o retorno venoso e a perfusão placentária.",j:"Inchaço repentino, especialmente em mãos e rosto, merece atenção imediata — avise a Juliana e seu médico."},
    {e:"😴",l:"Fadiga",d:"Proteína em todas as refeições sustenta a energia. Não pule refeições. Ferro e B12 são essenciais nessa fase.",j:"Peça à Juliana verificar seus exames de ferro e ferritina."},
    {e:"🔥",l:"Refluxo",d:"Refeições pequenas e frequentes. Não deite após comer. Reduza café e alimentos ácidos. Mastigue bem os alimentos.",j:"A Juliana pode indicar ajuste alimentar específico para essa fase."},
    {e:"⚠️",l:"Pré-eclâmpsia",d:"ATENÇÃO: Se tiver pressão ≥ 140/90, cefaleia intensa, visão turva, inchaço súbito em mãos e rosto, dor no quadrante superior direito do abdômen ou diminuição dos movimentos do bebê — procure atendimento médico imediato. Não espere a próxima consulta.",j:"Avise a Juliana imediatamente. Ela pode orientar ajustes nutricionais urgentes enquanto você busca atendimento médico."},
  ],
};

const RECEITAS = {
  t1:[
    {e:"🫚",n:"Vitamina do Folato",tag:"1º Trimestre · Tubo Neural",i:"• 1 xícara de espinafre fresco\n• 1/2 manga\n• Suco de 1 laranja\n• 200ml de água",p:"Bata tudo no liquidificador. Tome logo após preparar para preservar o folato.",b:"✦ Espinafre e laranja são ricos em folato natural. Essencial no 1º trimestre para formação do tubo neural."},
    {e:"🍳",n:"Omelete de Colina",tag:"1º Trimestre · Desenvolvimento Neural",i:"• 2 ovos caipira\n• Punhado de espinafre\n• 1 colher de sopa de azeite\n• Sal rosa e orégano",p:"Bata os ovos, refogue o espinafre no azeite, junte os ovos e cozinhe em fogo baixo com temperos naturais.",b:"✦ Gema de ovo caipira é a fonte mais biodisponível de colina — essencial para formação do tubo neural."},
    {e:"🫐",n:"Bowl Antienjoo",tag:"1º Trimestre · Enjoo e Nutrição",i:"• 1/2 xícara de aveia\n• Banana fatiada\n• Frutas vermelhas\n• 1 col. sopa de chia\n• Mel a gosto",p:"Monte o bowl com a aveia hidratada na base, frutas e chia por cima. Adoce com mel.",b:"✦ Aveia e banana são de fácil digestão e ajudam a reduzir enjoo. Chia adiciona ômega-3 e fibras."},
  ],
  t2:[
    {e:"🥣",n:"Sopa Mineral",tag:"2º Trimestre · Cálcio e Ferro",i:"• 1 xícara de abóbora\n• 1/2 xícara de grão-de-bico cozido\n• 1 col. chá de cúrcuma\n• 2 col. sopa de azeite\n• Coentro, alho e sal rosa",p:"Cozinhe a abóbora com o grão-de-bico e alho. Bata com cúrcuma. Finalize com azeite e coentro.",b:"✦ Grão-de-bico: ferro, cálcio e magnésio. Cúrcuma: anti-inflamatório. Azeite: absorção de vitaminas lipossolúveis."},
    {e:"🍌",n:"Vitamina de Cálcio",tag:"2º Trimestre · Ossos e Sono",i:"• 200ml de leite de amêndoas\n• 1 col. sopa de tahine\n• 1 banana congelada\n• 1 col. chá de canela",p:"Bata tudo no liquidificador. Ótima opção para o lanche da tarde ou antes de dormir.",b:"✦ Tahine é riquíssimo em cálcio biodisponível. Banana: magnésio e triptofano — aliados do sono na gestação."},
    {e:"🐟",n:"Bowl Ômega",tag:"2º Trimestre · Cérebro do Bebê",i:"• 150g de sardinha fresca ou salmão grelhado\n• 1/2 xícara de quinoa cozida\n• Rúcula e tomate cereja\n• Azeite, limão e orégano",p:"Monte o bowl com quinoa na base, peixe fatiado e salada. Tempere com azeite, limão e orégano.",b:"✦ DHA do peixe é essencial para o desenvolvimento cerebral e ocular do bebê no 2º trimestre."},
  ],
  t3:[
    {e:"🥑",n:"Shake de Colina",tag:"3º Trimestre · Maturação Cerebral",i:"• 1 ovo caipira cozido\n• 1/2 abacate\n• 200ml de leite de coco\n• 1 col. sopa de cacau 70%\n• 1 tâmara sem caroço",p:"Bata tudo no liquidificador até ficar cremoso. Consuma no café da manhã ou lanche.",b:"✦ Colina do ovo + gordura boa do abacate + energia da tâmara. Combo poderoso para o 3º trimestre."},
    {e:"🫙",n:"Sopa do Ninho",tag:"3º Trimestre · Ferro e Energia",i:"• 1 xícara de lentilha vermelha\n• 1 cenoura\n• 1 col. chá de cúrcuma\n• 2 col. sopa de azeite\n• Alho e suco de limão",p:"Cozinhe a lentilha com cenoura, cúrcuma e alho. Bata parcialmente. Finalize com azeite e gotas de limão.",b:"✦ Lentilha: ferro não-heme + proteína. Vitamina C do limão dobra a absorção do ferro."},
    {e:"🌱",n:"Pudim de Chia",tag:"3º Trimestre · Intestino e Ômega-3",i:"• 3 col. sopa de chia\n• 200ml de leite de coco\n• Frutas vermelhas\n• Mel a gosto",p:"Misture chia e leite de coco, deixe gelar por 4h ou overnight. Sirva com frutas vermelhas e mel.",b:"✦ Chia: ômega-3 vegetal, fibras para intestino e cálcio. Frutas vermelhas: antioxidantes para imunidade."},
  ],
  enjoo:[
    {e:"🧊",n:"Água Gelada com Gengibre e Limão",tag:"Enjoo · Alívio Natural",i:"• 500ml de água gelada\n• 3 fatias finas de gengibre fresco\n• Rodelas de limão a gosto",p:"Coloque o gengibre e o limão na água gelada. Tome em pequenos goles ao longo do dia. Mantenha sempre na geladeira.",b:"✦ Gengibre atua nos receptores serotoninérgicos reduzindo náuseas. Limão ajuda a equilibrar o pH."},
    {e:"🌾",n:"Bowl de Aveia com Banana",tag:"Enjoo · Leve e Reconfortante",i:"• 4 col. sopa de aveia em flocos\n• 1 banana fatiada\n• Mel a gosto\n• Canela em pó",p:"Hidrate a aveia com água morna. Acrescente a banana fatiada, mel e canela. Consuma em temperatura ambiente.",b:"✦ Aveia e banana são de fácil digestão. Ótima opção antes de levantar para quem tem enjoo matinal."},
  ],
  intestino_preso:[
    {e:"💧",n:"TCM em Jejum",tag:"Intestino Preso · Protocolo Juliana",i:"• 1 col. chá de TCM (marcas: Equaliv, Bigens, Copra ou Vitafor)\n• Água",p:"Tome 1 colher de chá de TCM em jejum, antes de qualquer alimento. Beba pelo menos 2 copos de água na sequência.",b:"✦ TCM estimula suavemente o peristaltismo intestinal. Fundamental beber no mínimo 8 copos de água ao dia."},
    {e:"🍊",n:"Mix de Frutas Laxativas",tag:"Intestino Preso · Fibras Naturais",i:"• 1 fatia de mamão\n• 1 ameixa hidratada\n• Suco de 1 laranja\n• 1 col. sopa de chia",p:"Corte as frutas, misture com o suco de laranja e adicione a chia. Consuma no café da manhã.",b:"✦ Ameixa: sorbitol de ação laxativa suave. Mamão: papaína e fibras. Laranja: vitamina C e fibras. Chia: gel de fibras que hidrata o intestino."},
    {e:"🌾",n:"Mingau de Farelo de Aveia",tag:"Intestino Preso · Fibras Solúveis",i:"• 4 col. sopa de farelo de aveia\n• 200ml de água\n• 1 col. sopa de chia\n• Frutas vermelhas\n• Mel a gosto",p:"Cozinhe o farelo de aveia na água mexendo sempre. Acrescente a chia, frutas e mel.",b:"✦ Farelo de aveia: beta-glucana que forma gel e lubrifica o intestino. Chia adiciona fibras e ômega-3."},
  ],
  intestino_solto:[
    {e:"🍌",n:"Mingau Reconstituinte",tag:"Intestino Solto · Protocolo Juliana",i:"• 4 col. sopa de aveia em flocos\n• 200ml de leite de arroz\n• 1 banana cozida\n• Mel a gosto",p:"Cozinhe a aveia no leite de arroz mexendo sempre. Acrescente a banana cozida amassada e mel. Sirva morno.",b:"✦ Aveia: fibras solúveis que consolidam as fezes. Banana cozida: amido resistente que regula o intestino. Leite de arroz: de fácil digestão e sem lactose."},
    {e:"🥕",n:"Caldo de Cenoura com Frango",tag:"Intestino Solto · Reconstituinte",i:"• 1 cenoura cozida e amassada\n• 100g de frango desfiado\n• Caldo caseiro de legumes\n• Sal rosa e cúrcuma",p:"Cozinhe a cenoura até ficar bem macia. Amasse ou bata. Acrescente o frango desfiado e tempere com sal rosa e cúrcuma.",b:"✦ Cenoura cozida: pectina que adsorve toxinas e regula o trânsito intestinal. Frango: proteína de fácil digestão."},
  ],
  diabetes:[
    {e:"🥗",n:"Bowl sem Pico Glicêmico",tag:"Diabetes Gestacional · Índice Glicêmico Baixo",i:"• 1/2 xícara de quinoa cozida\n• 2 ovos mexidos\n• Folhas verdes a gosto\n• 1/4 abacate\n• Azeite e limão",p:"Monte o bowl com quinoa na base, ovos por cima, folhas e abacate fatiado. Tempere com azeite e limão.",b:"✦ Quinoa: proteína completa e baixo IG. Abacate: gordura boa que retarda absorção do carboidrato. Ovos: proteína que estabiliza a glicemia."},
    {e:"🍫",n:"Vitamina do Equilíbrio",tag:"Diabetes Gestacional · Sem Açúcar",i:"• 1/2 abacate\n• 200ml de leite de amêndoas sem açúcar\n• 1 col. sopa de cacau 70%\n• Canela em pó\n• Gelo",p:"Bata tudo no liquidificador. A canela já adoça naturalmente — não é necessário adicionar mais nada.",b:"✦ Gordura do abacate + fibra do cacau: combinação que não eleva a glicemia. Canela melhora sensibilidade à insulina."},
    {e:"🍳",n:"Omelete Proteica Completa",tag:"Diabetes Gestacional · Proteína e Fibra",i:"• 2 ovos caipira\n• 1 col. sopa de queijo cottage\n• Espinafre e tomate cereja\n• Azeite e orégano",p:"Recheie a omelete com cottage, espinafre e tomate. Cozinhe em fogo baixo no azeite.",b:"✦ Proteína + gordura boa: combinação que estabiliza a glicemia por horas. Espinafre: magnésio que melhora resistência insulínica."},
  ],
  anemia:[
    {e:"🥤",n:"Suco do Ferro — Protocolo Juliana",tag:"Anemia · Receita Real do Protocolo",i:"• 1/2 xícara da rama da cenoura\n• 1/2 cenoura orgânica pequena com casca\n• 100g de polpa de acerola (descongelada)\n• 2 castanhas do Pará\n• 1/2 maçã com casca\n• 120ml de água filtrada",p:"Bata tudo no liquidificador até ficar bem homogêneo. Adicione mais água se necessário. Não coar. Tomar 1 vez ao dia por pelo menos 30 dias, longe de refeições com cálcio (iogurte, queijo, leite, brócolis, amêndoas, gergelim).",b:"✦ Rama da cenoura: mais rica em ferro que a beterraba e extremamente anti-inflamatória. Acerola: vitamina C que potencializa absorção do ferro. Castanha do Pará: selênio e gordura boa."},
    {e:"🫘",n:"Bowl do Ferro",tag:"Anemia · Ferro e Absorção",i:"• 1/2 xícara de feijão preto cozido\n• Arroz integral\n• Couve refogada com alho\n• 1 ovo\n• Suco generoso de limão",p:"Monte o bowl com arroz e feijão, couve refogada com alho e ovo. Esprema bastante limão por cima.",b:"✦ Vitamina C do limão triplica absorção do ferro não-heme. Couve: ferro + folato. Ovo: ferro de alta biodisponibilidade. Não consuma com laticínios na mesma refeição."},
  ],
  hipertensao:[
    {e:"🧃",n:"Suco Vasodilatador",tag:"Desordens Hipertensivas · Óxido Nítrico",i:"• 1 beterraba pequena crua\n• 2 rodelas de abacaxi\n• 100g de polpa de acerola\n• 2 cm de gengibre fresco\n• 200ml de água filtrada",p:"Bata tudo no liquidificador. Não coar. Consumir preferencialmente pela manhã, longe das refeições principais.",b:"✦ Beterraba: precursora de óxido nítrico com potencial vasodilatador. Acerola: vitamina C e antioxidantes. Gengibre: anti-inflamatório."},
    {e:"🥗",n:"Bowl Vasodilatador",tag:"Desordens Hipertensivas · Anti-inflamatório",i:"• 1 beterraba cozida fatiada\n• 1/4 abacate\n• 1/2 xícara de lentilha cozida\n• Rúcula\n• Azeite e limão (sem sal)",p:"Monte o bowl com lentilha na base, beterraba, abacate e rúcula. Tempere apenas com azeite e limão — sem sal.",b:"✦ Beterraba: vasodilatação. Abacate: potássio e gordura boa. Lentilha: magnésio e folato. Sem sódio adicionado — essencial no controle da pressão."},
    {e:"🐟",n:"Sardinha com Ervas",tag:"Desordens Hipertensivas · Ômega-3 e Proteção Endotelial",i:"• 2 sardinhas frescas\n• 2 dentes de alho\n• Suco de 1 limão\n• Azeite extra virgem\n• Orégano, salsinha e alecrim",p:"Tempere as sardinhas com alho, limão, azeite e ervas naturais. Grelhe ou asse. Sem sal — os temperos naturais são suficientes.",b:"✦ DHA e EPA da sardinha protegem o endotélio vascular. Alho: compostos com ação vasodilatadora. Sem sódio — fundamental para controle da pressão."},
    {e:"🍲",n:"Sopa do Magnésio",tag:"Desordens Hipertensivas · Magnésio e Anti-inflamatório",i:"• 1 xícara de espinafre\n• 1/2 xícara de grão-de-bico cozido\n• 1 xícara de abóbora\n• 2 col. sopa de azeite\n• Cúrcuma e alho (sem sal)",p:"Cozinhe a abóbora com o grão-de-bico e alho. Acrescente o espinafre nos últimos minutos. Bata parcialmente e finalize com azeite e cúrcuma.",b:"✦ Espinafre: magnésio que reduz vasoespasmo. Grão-de-bico: folato que reduz homocisteína. Cúrcuma: anti-inflamatório. Sem sal adicionado."},
    {e:"🫐",n:"Vitamina Anti-inflamatória",tag:"Desordens Hipertensivas · Antioxidantes",i:"• 1 xícara de frutas vermelhas (morango, mirtilo, framboesa)\n• 1 col. sopa de chia\n• 200ml de água\n• Mel a gosto",p:"Bata tudo no liquidificador. Tome logo após preparar para preservar os antioxidantes.",b:"✦ Frutas vermelhas: polifenóis que protegem o endotélio vascular. Chia: ômega-3 vegetal anti-inflamatório."},
  ],
};

const MITOS = [
  {p:"Posso comer sushi na gestação?",r:"Evite peixes e frutos do mar crus — risco de listeria e toxoplasmose. Opte por versões cozidas ou grelhadas. A segurança do bebê vem primeiro."},
  {p:"Café faz mal na gestação?",r:"Até 200mg de cafeína por dia (1 café expresso) é considerado seguro pela maioria das diretrizes. O problema é o excesso, não o café em si."},
  {p:"Posso comer ovo todo dia?",r:"Sim! Ovo é uma das fontes mais ricas de colina, essencial para o desenvolvimento cerebral do bebê. Prefira ovos caipira bem cozidos."},
  {p:"Preciso comer por dois?",r:"Não — você precisa comer melhor, não o dobro. O aumento calórico real é de cerca de 300 kcal/dia no 2º e 3º trimestre. Qualidade supera quantidade."},
  {p:"Abacate engorda e devo evitar?",r:"Ao contrário! Abacate é rico em folato, potássio e gorduras que favorecem a gestação. É um dos alimentos mais recomendados durante a gravidez."},
  {p:"Posso tomar qualquer chá?",r:"Não. Na gestação são permitidos apenas chá de gengibre e chás de frutas (abacaxi, maçã, maracujá, frutas vermelhas). Chás proibidos: chá verde, preto, de canela, de cravo e ervas medicinais em geral."},
  {p:"Tapioca é saudável na gestação?",r:"Tapioca é um carboidrato refinado de alto índice glicêmico — deve ser evitada, assim como arroz branco, pão francês, macarrão comum e outros refinados. Prefira versões integrais."},
];

const CHECKLIST = [
  "💧 Bebi pelo menos 8 copos de água hoje",
  "🌿 Tomei meus suplementos prescritos",
  "🥗 Comi pelo menos 1 porção de folhosos escuros",
  "🍎 Consumi frutas e verduras coloridas",
  "🫘 Inclui leguminosas na minha alimentação",
  "☀️ Me expus ao sol pela manhã",
  "😴 Priorizei meu sono e descanso",
  "🧘 Cuidei do meu bem-estar emocional hoje",
];

const POSPARTO = {
  recuperacao:{titulo:"Recuperação e Cicatrização",desc:"Seu corpo realizou algo extraordinário. A nutrição nessa fase acelera a cicatrização, repõe reservas e prepara você para a amamentação.",nuts:[{n:"Colágeno hidrolisado",m:"Cicatrização de episiotomia ou cesárea"},{n:"Vitamina C",m:"Síntese de colágeno e imunidade"},{n:"Ferro + B12",m:"Reposição após perdas sanguíneas do parto"},{n:"Zinco",m:"Regeneração tecidual e imunidade"},{n:"Probióticos",m:"Restauração da microbiota pós-parto"}]},
  amamentacao:{titulo:"Nutrição para Amamentação",desc:"O leite materno é o alimento mais completo para seu bebê. Sua alimentação influencia diretamente a qualidade e quantidade do leite.",dicas:["Beba água sempre que amamentar — mínimo de 2,5L/dia","Aveia: beta-glucana estimula a prolactina naturalmente","Alho e cúrcuma passam sabor ao leite e educam o paladar do bebê","Continue com ômega-3: DHA no leite é essencial para o cérebro do bebê","Evite álcool, excesso de cafeína e qualquer suplemento sem orientação"],galacto:["Aveia","Amêndoas","Folhas verdes escuras","Sementes de abóbora","Alho","Gengibre","Chia"]},
  humor:{titulo:"Humor, Sono e Baby Blues",desc:"Baby blues afeta até 80% das mães na primeira semana. Nutrição pode ser uma aliada poderosa no equilíbrio emocional do pós-parto.",nuts:[{n:"Magnésio bisglicinato",m:"Ansiedade, irritabilidade e qualidade do sono"},{n:"Triptofano",m:"Precursor de serotonina e melatonina"},{n:"Vitamina D3",m:"Associada à depressão pós-parto quando baixa"},{n:"Ômega-3 DHA",m:"Ação anti-inflamatória e neuroprotetora"}],alimentos:["Banana (triptofano)","Ovos caipira (colina e B12)","Sementes de abóbora (magnésio e zinco)","Cacau 70% (magnésio)","Sardinha e salmão (DHA)","Abacate (gordura boa e potássio)"]},
};

const PP_RECEITAS = [
  {e:"🍲",n:"Sopa Reconstitutiva",tag:"Pós-parto · Recuperação e Ferro",i:"• 1 xícara de lentilha vermelha\n• 1 cenoura e 1 batata-doce\n• 2 col. sopa de azeite\n• Cúrcuma, alho e sal rosa\n• Suco de 1 limão",p:"Cozinhe tudo junto, bata parcialmente. Finalize com azeite e limão. Consuma morno.",b:"✦ Rica em ferro, proteína e anti-inflamatórios. Perfeita para a primeira semana pós-parto."},
  {e:"🥣",n:"Vitamina da Amamentação",tag:"Pós-parto · Lactação",i:"• 3 col. sopa de aveia\n• 200ml de leite de amêndoas\n• 1 banana\n• Mel a gosto\n• Canela",p:"Bata tudo no liquidificador. Tome morno ou gelado.",b:"✦ Aveia: beta-glucana estimula prolactina. Amêndoas: cálcio e gordura boa para o leite."},
  {e:"🥗",n:"Bowl da Recuperação",tag:"Pós-parto · Cicatrização",i:"• 1/2 xícara de quinoa\n• 100g de frango grelhado\n• Rúcula e tomate cereja\n• Abacate\n• Limão e azeite",p:"Monte o bowl com quinoa na base, frango fatiado, salada e abacate. Tempere com limão e azeite.",b:"✦ Proteína completa para cicatrização. Vitamina C do limão sintetiza colágeno. Gordura do abacate nutre o sistema nervoso."},
  {e:"🍫",n:"Bolinha de Energia",tag:"Pós-parto · Energia e Humor",i:"• 1 xícara de aveia\n• 3 col. sopa de pasta de amendoim\n• 2 col. sopa de cacau 70%\n• 3 tâmaras picadas\n• Coco ralado",p:"Misture tudo, enrole em bolinhas e leve à geladeira por 30min.",b:"✦ Energia sustentada. Cacau: magnésio e humor. Tâmara: ferro e energia rápida."},
];

// ─── SETUP ────────────────────────────────────────────────────────────────────

function SetupScreen({ onComplete }) {
  const [nome, setNome] = useState("");
  const [semana, setSemana] = useState("12");
  const [dpp, setDpp] = useState("");
  const [sexo, setSexo] = useState("");
  const [nomeBebe, setNomeBebe] = useState("");
  const [diags, setDiags] = useState([]);

  const diagOps = ["Diabetes gestacional","Anemia","Hipotireoidismo","Endometriose","SOP","Desordens Hipertensivas","Nenhum"];
  const diagsRisco = ["Desordens Hipertensivas"];

  const toggleDiag = (d) => {
    if (d === "Nenhum") { setDiags(["Nenhum"]); return; }
    setDiags(prev => {
      const s = prev.filter(x => x !== "Nenhum");
      return s.includes(d) ? s.filter(x => x !== d) : [...s, d];
    });
  };

  return (
    <div className="setup-screen">
      <div className="setup-logo">Aurora</div>
      <div className="setup-tagline">Sua jornada começa aqui</div>
      <div className="setup-card">
        <h2>Olá, mamãe ✨</h2>
        <p>Vamos personalizar o Aurora para acompanhar você e seu bebê com carinho e precisão clínica.</p>
        <div className="setup-field">
          <label className="setup-label">Seu nome</label>
          <input className="setup-input" placeholder="Como posso te chamar?" value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div className="setup-field">
          <label className="setup-label">Semana da gestação</label>
          <input className="setup-input" type="number" min="4" max="42" placeholder="Ex: 14" value={semana} onChange={e => setSemana(e.target.value)} />
        </div>
        <div className="setup-field">
          <label className="setup-label">Data provável do parto</label>
          <input className="setup-input" type="date" value={dpp} onChange={e => setDpp(e.target.value)} />
        </div>
        <div className="setup-field">
          <label className="setup-label">Sexo do bebê</label>
          <div className="setup-radio-group">
            {["Menina 💕","Menino 💙","Surpresa 🌟"].map(op => (
              <div key={op} className={`setup-radio ${sexo === op ? "sel" : ""}`} onClick={() => setSexo(op)}>{op}</div>
            ))}
          </div>
        </div>
        <div className="setup-field">
          <label className="setup-label">Nome do bebê (opcional)</label>
          <input className="setup-input" placeholder="O nome escolhido..." value={nomeBebe} onChange={e => setNomeBebe(e.target.value)} />
        </div>
        <div className="setup-field">
          <label className="setup-label">Você tem algum desses diagnósticos?</label>
          <div className="diag-grid">
            {diagOps.map(d => (
              <div key={d} className={`diag-chip ${diags.includes(d) ? (diagsRisco.includes(d) ? "sel-red" : "sel") : ""}`} onClick={() => toggleDiag(d)}>{d}</div>
            ))}
          </div>
        </div>
        <button className="setup-btn" onClick={() => { if(nome && semana) onComplete({nome, semana:parseInt(semana), dpp, sexo, nomeBebe, diags}); }} disabled={!nome || !semana}>
          Entrar no Aurora →
        </button>
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

function HomeTab({ dados, semana, onSemanaChange }) {
  const baby = BABY_SIZES[Math.min(semana,40)];
  const tri = semana<=13?1:semana<=26?2:3;
  const info = TRIM_INFO[tri];
  const hoje = new Date().toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});
  const diasR = dados.dpp ? Math.max(0,Math.ceil((new Date(dados.dpp)-new Date())/86400000)) : null;
  const temHiper = dados.diags?.includes("Desordens Hipertensivas");

  return (
    <div className="content">
      <p style={{fontSize:12,color:"var(--text-light)",textTransform:"capitalize",marginBottom:4}}>{hoje}</p>
      <h2 className="stitle">Olá, {dados.nome} 🌸</h2>
      <p className="ssub">{dados.nomeBebe ? `${dados.nomeBebe} está na semana ${semana}` : `Seu bebê está na semana ${semana}`}{dados.sexo && dados.sexo!=="Surpresa 🌟" ? ` · ${dados.sexo}` : ""}</p>

      <div className="sw-sel">
        <span className="sw-label">Semana atual</span>
        <div className="sw-ctrl">
          <button className="sw-btn" onClick={() => onSemanaChange(Math.max(4,semana-1))}>−</button>
          <span className="sw-num">{semana}</span>
          <button className="sw-btn" onClick={() => onSemanaChange(Math.min(42,semana+1))}>+</button>
        </div>
      </div>

      <div className="baby-card">
        <span className="baby-emoji">{baby.e}</span>
        <div className="baby-label">Seu bebê agora tem o tamanho de</div>
        <div className="baby-size">um {baby.f}</div>
        <div className="baby-cm">{baby.c} de comprimento · Semana {semana}</div>
      </div>

      {temHiper && (
        <div className="alerta-box" style={{marginBottom:14}}>
          <div className="alerta-titulo">⚠️ Atenção — Desordens Hipertensivas</div>
          {["Pressão arterial ≥ 140/90 → ir ao médico imediatamente","Cefaleia intensa e persistente → não espere","Visão turva, flashes de luz → emergência","Inchaço súbito em mãos e rosto → contato imediato","Diminuição dos movimentos fetais → emergência"].map((a,i) => (
            <div key={i} className="alerta-item"><span>⚠️</span><span>{a}</span></div>
          ))}
          <p style={{fontSize:12,color:"#8B3030",marginTop:10,lineHeight:1.6}}>Monitore sua pressão em casa regularmente. Descanse em decúbito lateral esquerdo. Evite sódio, ultraprocessados e longos períodos em pé.</p>
        </div>
      )}

      <div className="card card-t">
        <div className="csub">{tri}º Trimestre · Semanas {info.sem}</div>
        <div className="ctitle">{info.titulo}</div>
        <p className="ctext">{info.desc}</p>
      </div>

      {diasR !== null && (
        <div className="card card-r">
          <div className="csub">Data provável do parto</div>
          <div className="ctitle">{diasR === 0 ? "Hoje é o grande dia! 🌟" : `${diasR} dias para te encontrar`}</div>
          <p className="ctext">{dados.dpp && new Date(dados.dpp+"T12:00:00").toLocaleDateString("pt-BR",{day:"numeric",month:"long",year:"numeric"})}</p>
        </div>
      )}

      {dados.diags && dados.diags.length > 0 && !dados.diags.includes("Nenhum") && (
        <div className="card card-g">
          <div className="csub">Acompanhamento personalizado</div>
          <div className="ctitle">Cuidado especial para você</div>
          <p className="ctext" style={{marginBottom:10}}>O Aurora está adaptado para seus diagnósticos. Veja receitas e orientações específicas na aba Nutri.</p>
          <div>{dados.diags.map(d => <span key={d} className="tag-pill">{d}</span>)}</div>
        </div>
      )}
    </div>
  );
}

// ─── DIÁRIO ───────────────────────────────────────────────────────────────────

function DiarioTab({ dados, semana }) {
  const [texto, setTexto] = useState("");
  const [humor, setHumor] = useState("");
  const [entries, setEntries] = useState([]);
  const [memorias, setMemorias] = useState({primeiraMexida:"",primeiraEco:"",nomeEscolhido:dados.nomeBebe||"",momentoEspecial:""});
  const [calMarcados, setCalMarcados] = useState({});

  const tri = semana<=13?1:semana<=26?2:3;
  const pronome = dados.sexo==="Menino 💙" ? "Querido" : dados.sexo==="Menina 💕" ? "Querida" : "Querido(a)";
  const nomeBebe = dados.nomeBebe || "bebê";
  const humores = [{em:"😊",lb:"Bem"},{em:"😌",lb:"Tranquila"},{em:"😴",lb:"Cansada"},{em:"😢",lb:"Emotiva"},{em:"🤢",lb:"Enjoada"}];

  const salvar = () => {
    if (!texto.trim()) return;
    setEntries(prev => [{semana, texto, humor, data:new Date().toLocaleDateString("pt-BR")}, ...prev]);
    setTexto(""); setHumor("");
  };

  const hoje = new Date();
  const ano = hoje.getFullYear(); const mes = hoje.getMonth();
  const primeiroDia = new Date(ano,mes,1).getDay();
  const diasNoMes = new Date(ano,mes+1,0).getDate();
  const diasCal = [];
  for(let i=0;i<primeiroDia;i++) diasCal.push(null);
  for(let i=1;i<=diasNoMes;i++) diasCal.push(i);

  return (
    <div className="content">
      <h2 className="stitle">Diário da Aurora</h2>
      <p className="ssub">Um registro da sua jornada mais especial</p>

      <p style={{fontSize:12,color:"var(--text-light)",letterSpacing:"1px",textTransform:"uppercase",marginBottom:10}}>Como você está hoje?</p>
      <div className="humor-grid">
        {humores.map(h => (
          <button key={h.em} className={`humor-btn ${humor===h.em?"sel":""}`} onClick={() => setHumor(h.em)}>
            <span className="em">{h.em}</span><span className="lb">{h.lb}</span>
          </button>
        ))}
      </div>

      <div className="diario-carta">
        <div className="diario-data">Semana {semana} · {hoje.toLocaleDateString("pt-BR")}</div>
        <div className="diario-intro">{pronome} {nomeBebe}...</div>
        <textarea className="diario-ta" placeholder="Escreva o que está sentindo, o que aconteceu de especial hoje, seus pensamentos e desejos para o futuro de vocês..." value={texto} onChange={e=>setTexto(e.target.value)} rows={5} />
        <button className="diario-btn" onClick={salvar}>Guardar este momento 🌸</button>
      </div>

      <div className="card" style={{marginBottom:16}}>
        <div className="csub">Calendário de bem-estar</div>
        <div className="ctitle" style={{marginBottom:16}}>Marque como você se sentiu</div>
        <div className="cal-hdr">{["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map(d=><div key={d} className="cal-hd">{d}</div>)}</div>
        <div className="cal-grid">
          {diasCal.map((dia,i) => {
            const key = `${ano}-${mes}-${dia}`;
            return dia ? (
              <div key={i} className={`cal-day ${dia===hoje.getDate()?"today":""} ${calMarcados[key]?"marked":""}`} onClick={() => setCalMarcados(prev=>({...prev,[key]:!prev[key]}))}>
                {dia}
              </div>
            ) : <div key={i} />;
          })}
        </div>
        <p style={{fontSize:12,color:"var(--text-light)"}}>Toque em um dia para registrar. Dias em terracota têm registros.</p>
      </div>

      {tri >= 2 && (
        <div className="card" style={{marginBottom:16}}>
          <div className="csub">Memórias que ficam</div>
          <div className="ctitle" style={{marginBottom:16}}>Momentos especiais</div>
          {[{key:"primeiraMexida",icon:"👶",label:"Primeira vez que sentiu o bebê se mexer"},{key:"primeiraEco",icon:"🩻",label:"Primeira ecografia"},{key:"nomeEscolhido",icon:"💕",label:"Como escolheram o nome"},{key:"momentoEspecial",icon:"✨",label:"Um momento inesquecível"}].map(m => (
            <div key={m.key} className="mem-item">
              <div className="mem-icon">{m.icon}</div>
              <div style={{flex:1}}>
                <h4 style={{fontSize:13,fontWeight:500,marginBottom:4,color:"var(--text)"}}>{m.label}</h4>
                <input className="mem-inp" placeholder="Escreva aqui..." value={memorias[m.key]} onChange={e=>setMemorias(prev=>({...prev,[m.key]:e.target.value}))} />
              </div>
            </div>
          ))}
        </div>
      )}

      {entries.length > 0 && (
        <div>
          <p style={{fontSize:12,color:"var(--text-light)",letterSpacing:"1px",textTransform:"uppercase",marginBottom:12}}>Registros anteriores</p>
          {entries.map((e,i) => (
            <div key={i} className="entry-item">
              <div className="entry-wk">Semana {e.semana} · {e.data} {e.humor}</div>
              <div className="entry-tx">{e.texto}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SAÚDE ────────────────────────────────────────────────────────────────────

function SaudeTab({ semana, dados }) {
  const tri = semana<=13?1:semana<=26?2:3;
  const [trimTab, setTrimTab] = useState(tri);
  const [sintomasSel, setSintomasSel] = useState([]);
  const [dicaAtiva, setDicaAtiva] = useState(null);
  const [checks, setChecks] = useState([]);

  const toggleSint = (s) => {
    setSintomasSel(prev => prev.includes(s.l) ? prev.filter(x=>x!==s.l) : [...prev,s.l]);
    setDicaAtiva(prev => prev?.l===s.l ? null : s);
  };

  return (
    <div className="content">
      <h2 className="stitle">Saúde & Nutrição</h2>
      <p className="ssub">Registre seus sintomas e receba orientações do protocolo</p>

      <div className="trim-tabs">
        {[1,2,3].map(t => (
          <button key={t} className={`trim-tab ${trimTab===t?"active":""}`} onClick={() => {setTrimTab(t);setSintomasSel([]);setDicaAtiva(null);}}>
            {t}º Trimestre
          </button>
        ))}
      </div>

      <p style={{fontSize:12,color:"var(--text-light)",letterSpacing:"1px",textTransform:"uppercase",marginBottom:12}}>Como você está se sentindo?</p>
      <div className="sint-grid">
        {SINTOMAS[trimTab].map(s => (
          <div key={s.l} className={`sint-item ${sintomasSel.includes(s.l)?"sel":""}`} onClick={() => toggleSint(s)}>
            <span className="sint-emoji">{s.e}</span>
            <span className="sint-label">{s.l}</span>
          </div>
        ))}
      </div>

      {dicaAtiva && (
        <div className={dicaAtiva.l==="Pré-eclâmpsia" ? "alerta-box" : "dica-box"}>
          {dicaAtiva.l==="Pré-eclâmpsia" ? (
            <>
              <div className="alerta-titulo">⚠️ Pré-eclâmpsia / Suspeita</div>
              <div style={{fontSize:13,color:"#8B3030",lineHeight:1.7,marginBottom:8}}>{dicaAtiva.d}</div>
              <div style={{fontSize:12,color:"#B85050",fontStyle:"italic"}}>{dicaAtiva.j}</div>
            </>
          ) : (
            <>
              <div className="dica-titulo">Orientação Nutricional · {dicaAtiva.l}</div>
              <div className="dica-texto">{dicaAtiva.d}</div>
              <div className="dica-juliana">💬 {dicaAtiva.j}</div>
            </>
          )}
        </div>
      )}

      <div className="card card-t" style={{marginBottom:14}}>
        <div className="csub">Nutrientes-chave</div>
        <div className="ctitle">Foco do {trimTab}º Trimestre</div>
        {TRIM_INFO[trimTab].nuts.map(n => (
          <div key={n.n} className="nut-item">
            <div className="nut-dot" />
            <div><div className="nut-nome">{n.n}</div><div className="nut-motivo">{n.m}</div></div>
          </div>
        ))}
      </div>

      <div className="card" style={{marginBottom:14}}>
        <div className="csub">Checklist do dia</div>
        <div className="ctitle" style={{marginBottom:4}}>Seus hábitos de hoje</div>
        {CHECKLIST.map((c,i) => (
          <div key={i} className="check-item" onClick={() => setChecks(prev => prev.includes(i)?prev.filter(x=>x!==i):[...prev,i])}>
            <div className={`check-box ${checks.includes(i)?"on":""}`}>{checks.includes(i)?"✓":""}</div>
            <span className={`check-label ${checks.includes(i)?"on":""}`}>{c}</span>
          </div>
        ))}
        {checks.length > 0 && <p style={{fontSize:12,color:"var(--terracota)",marginTop:12,textAlign:"center"}}>{checks.length}/{CHECKLIST.length} hábitos concluídos hoje 🌸</p>}
      </div>

      <div className="card card-r">
        <div className="csub">Sinais de atenção</div>
        <div className="ctitle" style={{marginBottom:12}}>Quando entrar em contato</div>
        {TRIM_INFO[trimTab].alertas.map(a => (
          <div key={a} className="alerta-item"><span>⚠️</span><span>{a}</span></div>
        ))}
        <p style={{fontSize:12,color:"var(--text-light)",marginTop:14,lineHeight:1.6}}>Se notar qualquer um desses sinais, entre em contato imediato com seu médico e com a Juliana.</p>
      </div>
    </div>
  );
}

// ─── NUTRI ────────────────────────────────────────────────────────────────────

function NutriTab({ semana, dados }) {
  const tri = semana<=13?1:semana<=26?2:3;
  const [subtab, setSubtab] = useState("receitas");
  const [cat, setCat] = useState("trimestre");
  const [recAberta, setRecAberta] = useState(null);
  const [mitoAberto, setMitoAberto] = useState(null);

  const temDiabetes = dados.diags?.includes("Diabetes gestacional");
  const temAnemia = dados.diags?.includes("Anemia");
  const temHiper = dados.diags?.includes("Desordens Hipertensivas");

  const getReceitas = () => {
    if(cat==="trimestre") return RECEITAS[`t${tri}`];
    if(cat==="enjoo") return RECEITAS.enjoo;
    if(cat==="int_preso") return RECEITAS.intestino_preso;
    if(cat==="int_solto") return RECEITAS.intestino_solto;
    if(cat==="diabetes") return RECEITAS.diabetes;
    if(cat==="anemia") return RECEITAS.anemia;
    if(cat==="hiper") return RECEITAS.hipertensao;
    return [];
  };

  const cats = [
    {id:"trimestre",l:`${tri}º Trimestre`},
    {id:"enjoo",l:"Enjoo"},
    {id:"int_preso",l:"Intestino Preso"},
    {id:"int_solto",l:"Intestino Solto"},
    ...(temDiabetes?[{id:"diabetes",l:"Diabetes"}]:[]),
    ...(temAnemia?[{id:"anemia",l:"Anemia"}]:[]),
    ...(temHiper?[{id:"hiper",l:"Hipertensão"}]:[]),
  ];

  return (
    <div className="content">
      <h2 className="stitle">Nutri</h2>
      <p className="ssub">Receitas, orientações e esclarecimentos</p>

      <div className="trim-tabs">
        {[{id:"receitas",l:"Receitas"},{id:"semana",l:"Semana a Semana"},{id:"mitos",l:"Mitos x Verdades"}].map(t => (
          <button key={t.id} className={`trim-tab ${subtab===t.id?"active":""}`} onClick={() => setSubtab(t.id)}>{t.l}</button>
        ))}
      </div>

      {subtab==="receitas" && (
        <>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
            {cats.map(c => (
              <div key={c.id} className={`diag-chip ${cat===c.id?"sel":""}`} onClick={() => {setCat(c.id);setRecAberta(null);}} style={{fontSize:12}}>{c.l}</div>
            ))}
          </div>
          {getReceitas().map((r,i) => (
            <div key={i} className={`rec-card ${recAberta===i?"open":""}`} onClick={() => setRecAberta(recAberta===i?null:i)}>
              <div className="rec-header">
                <div style={{display:"flex",alignItems:"center"}}>
                  <span className="rec-emoji">{r.e}</span>
                  <div><div className="rec-nome">{r.n}</div><div className="rec-tag">{r.tag}</div></div>
                </div>
                <span className="rec-arrow">›</span>
              </div>
              {recAberta===i && (
                <div className="rec-body">
                  <div className="rec-stitle">Ingredientes</div>
                  <div className="rec-ing">{r.i}</div>
                  <div className="rec-stitle">Modo de preparo</div>
                  <div className="rec-prep">{r.p}</div>
                  <div className="rec-ben">{r.b}</div>
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {subtab==="semana" && (
        <>
          <div className="card card-t" style={{marginBottom:14}}>
            <div className="csub">Semana {semana}</div>
            <div className="ctitle">O que está acontecendo</div>
            <p className="ctext" style={{marginBottom:12}}>
              {semana<=8 && "Os órgãos principais estão se formando. O coração já bate. Metilfolato, DHA e zinco são os nutrientes mais críticos agora para o desenvolvimento celular."}
              {semana>8&&semana<=13 && "O bebê já tem todos os órgãos formados e agora cresce rapidamente. Os reflexos estão se desenvolvendo. A placenta assume a produção hormonal."}
              {semana>13&&semana<=20 && "O bebê começa a ouvir sua voz. Os movimentos ficam mais perceptíveis. É a fase de ouro — mais energia, menos enjoo."}
              {semana>20&&semana<=28 && "O bebê abre e fecha os olhos. Os pulmões se desenvolvem. DHA é essencial nessa fase para maturação cerebral e ocular."}
              {semana>28&&semana<=36 && "O bebê ganha peso rapidamente — cerca de 200g por semana. Ferro e proteína são os nutrientes do momento."}
              {semana>36 && "A reta final! O bebê está se posicionando para o parto. Colina, probióticos e vitamina K2 são os focos nutricionais dessa fase."}
            </p>
            <div className="csub" style={{marginBottom:8}}>O que muda no seu corpo</div>
            <p className="ctext">
              {semana<=13 && "HCG no pico, progesterona subindo. Náuseas, sonolência e hipersensibilidade são comuns e normais. Consuma refeições pequenas e frequentes."}
              {semana>13&&semana<=26 && "O útero cresce acima do umbigo. A barriga aparece. Hidratação e ferro são essenciais nessa fase."}
              {semana>26 && "O centro de gravidade muda. Descanse em decúbito lateral esquerdo para melhorar a circulação. O corpo se prepara para o parto."}
            </p>
          </div>
          <div className="card card-r">
            <div className="csub">Foco Nutricional · Semana {semana}</div>
            <div className="ctitle" style={{marginBottom:12}}>Prioridades desta semana</div>
            {TRIM_INFO[tri].nuts.slice(0,3).map(n => (
              <div key={n.n} className="nut-item">
                <div className="nut-dot" />
                <div><div className="nut-nome">{n.n}</div><div className="nut-motivo">{n.m}</div></div>
              </div>
            ))}
          </div>
          <div className="card card-g">
            <div className="csub">O que consumir todo dia</div>
            <div className="ctitle" style={{marginBottom:12}}>Protocolo Juliana</div>
            {["1 porção de folhosos escuros (espinafre, rúcula, couve, agrião)","1 porção de frutas e 2 porções de verduras com casca quando possível","½ xícara de leguminosas (lentilha, feijão, grão-de-bico)","8 unidades de castanhas (mínimo 3x por semana)","1 col. sopa de sementes (chia ou semente de abóbora)","Temperos naturais em todas as refeições (cúrcuma, alho, orégano, salsinha)"].map((o,i) => (
              <div key={i} className="pp-nut-item"><span style={{color:"var(--terracota)",flexShrink:0}}>✦</span><span>{o}</span></div>
            ))}
          </div>
        </>
      )}

      {subtab==="mitos" && (
        <>
          <p style={{fontSize:13,color:"var(--text-light)",marginBottom:16,lineHeight:1.7}}>Dúvidas comuns sobre alimentação na gestação — respondidas com base em evidências e no protocolo da Juliana.</p>
          {MITOS.map((m,i) => (
            <div key={i} className="mito-item">
              <div className="mito-q" onClick={() => setMitoAberto(mitoAberto===i?null:i)}>
                <span>{m.p}</span>
                <span style={{fontSize:18,color:"var(--terracota)",transition:"transform 0.2s",display:"inline-block",transform:mitoAberto===i?"rotate(45deg)":"none"}}>+</span>
              </div>
              {mitoAberto===i && <div className="mito-r">{m.r}</div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ─── PÓS-PARTO ───────────────────────────────────────────────────────────────

function PosPartoTab() {
  const [subtab, setSubtab] = useState("recuperacao");
  const [recAberta, setRecAberta] = useState(null);
  const c = POSPARTO[subtab];

  return (
    <div className="content">
      <h2 className="stitle">Pós-parto</h2>
      <p className="ssub">Recuperação, amamentação e bem-estar</p>

      <div className="trim-tabs">
        {[{id:"recuperacao",l:"Recuperação"},{id:"amamentacao",l:"Amamentação"},{id:"humor",l:"Humor & Sono"},{id:"receitas",l:"Receitas"}].map(t => (
          <button key={t.id} className={`trim-tab ${subtab===t.id?"active":""}`} onClick={() => setSubtab(t.id)} style={{fontSize:11}}>{t.l}</button>
        ))}
      </div>

      {subtab!=="receitas" && c && (
        <>
          <div className="card card-t" style={{marginBottom:14}}>
            <div className="ctitle">{c.titulo}</div>
            <p className="ctext" style={{marginTop:8}}>{c.desc}</p>
          </div>
          {c.nuts && (
            <div className="card" style={{marginBottom:14}}>
              <div className="csub">Nutrientes essenciais</div>
              {c.nuts.map(n => (
                <div key={n.n} className="nut-item">
                  <div className="nut-dot" />
                  <div><div className="nut-nome">{n.n}</div><div className="nut-motivo">{n.m}</div></div>
                </div>
              ))}
            </div>
          )}
          {c.dicas && (
            <div className="card card-r" style={{marginBottom:14}}>
              <div className="csub">Dicas práticas</div>
              {c.dicas.map((d,i) => (
                <div key={i} className="pp-nut-item" style={{borderBottom:"1px solid #F5E0E4"}}><span style={{color:"var(--terracota)",flexShrink:0}}>✦</span><span>{d}</span></div>
              ))}
            </div>
          )}
          {c.galacto && (
            <div className="card card-g">
              <div className="csub">Alimentos galactogogos</div>
              <div className="ctitle" style={{marginBottom:12}}>Estimulam a produção de leite</div>
              <div>{c.galacto.map(a => <span key={a} className="tag-pill">{a}</span>)}</div>
            </div>
          )}
          {c.alimentos && (
            <div className="card card-g">
              <div className="csub">Alimentos aliados</div>
              <div style={{marginTop:8}}>{c.alimentos.map(a => <span key={a} className="tag-pill">{a}</span>)}</div>
            </div>
          )}
        </>
      )}

      {subtab==="receitas" && PP_RECEITAS.map((r,i) => (
        <div key={i} className={`rec-card ${recAberta===i?"open":""}`} onClick={() => setRecAberta(recAberta===i?null:i)}>
          <div className="rec-header">
            <div style={{display:"flex",alignItems:"center"}}>
              <span className="rec-emoji">{r.e}</span>
              <div><div className="rec-nome">{r.n}</div><div className="rec-tag">{r.tag}</div></div>
            </div>
            <span className="rec-arrow">›</span>
          </div>
          {recAberta===i && (
            <div className="rec-body">
              <div className="rec-stitle">Ingredientes</div>
              <div className="rec-ing">{r.i}</div>
              <div className="rec-stitle">Modo de preparo</div>
              <div className="rec-prep">{r.p}</div>
              <div className="rec-ben">{r.b}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function AuroraApp() {
  const [dados, setDados] = useState(null);
  const [semana, setSemana] = useState(12);
  const [tab, setTab] = useState("home");
  const [fase, setFase] = useState("gestacao");

  if (!dados) return <><style>{styles}</style><SetupScreen onComplete={d => { setDados(d); setSemana(d.semana); }} /></>;

  const tri = semana<=13?1:semana<=26?2:3;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="header-logo">Aurora · por Juliana</div>
          <div className="header-title">{dados.nomeBebe ? <><em>{dados.nomeBebe}</em> chegando</> : <>Sua gestação</>}</div>
          <div className="header-sub">{fase==="gestacao" ? `${tri}º trimestre · Semana ${semana}` : "Pós-parto · Recuperação"}</div>
          <div className="header-badge">
            {fase==="gestacao" ? (<><div className="wn">{semana}</div><div className="wl">semanas</div></>) : (<><div className="wn">🌸</div><div className="wl">pós-parto</div></>)}
          </div>
        </div>

        <div className="phase-toggle">
          <button className={`phase-btn ${fase==="gestacao"?"active":""}`} onClick={() => setFase("gestacao")}>🤰 Gestação</button>
          <button className={`phase-btn ${fase==="posparto"?"active":""}`} onClick={() => setFase("posparto")}>🤱 Pós-parto</button>
        </div>

        {fase==="gestacao" && (
          <>
            <nav className="nav">
              {[{id:"home",icon:"🌸",l:"Início"},{id:"diario",icon:"📖",l:"Diário"},{id:"saude",icon:"🌿",l:"Saúde"},{id:"nutri",icon:"🍽",l:"Nutri"}].map(n => (
                <button key={n.id} className={`nav-item ${tab===n.id?"active":""}`} onClick={() => setTab(n.id)}>
                  <span className="nav-icon">{n.icon}</span>{n.l}
                </button>
              ))}
            </nav>
            {tab==="home" && <HomeTab dados={dados} semana={semana} onSemanaChange={setSemana} />}
            {tab==="diario" && <DiarioTab dados={dados} semana={semana} />}
            {tab==="saude" && <SaudeTab semana={semana} dados={dados} />}
            {tab==="nutri" && <NutriTab semana={semana} dados={dados} />}
          </>
        )}

        {fase==="posparto" && <PosPartoTab />}
      </div>
    </>
  );
}
