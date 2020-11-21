function canvasOlustur() {
  let canvas = document.getElementById("myCanvas");
  canvas.height = document.getElementById("yukseklik").value;
  canvas.width = document.getElementById("genislik").value;
}

function koordinatTextOlustur() {
  document.getElementById("koordinatlar").innerHTML = "";
  let textSay = document.getElementById("koordinatSay").value;

  for (let i = 0; i < textSay; i++) {
    let div = document.createElement("div");
    div.className = "col-sm-auto mb-3";
    div.innerHTML =
      "<input class='koordinat form-control' placeholder='(x,y)'></input>";
    document.getElementById("koordinatlar").appendChild(div);
  }
}

function sekilCiz() {
  if (document.getElementById("noktaRadio").checked) {
    kareCiz();
  } else if (document.getElementById("cizgiRadio").checked) {
    cizgiCiz();
  } else {
    poligonCiz();
  }
}

function kareCiz() {
  var koordinat = document
    .getElementsByClassName("koordinat")[0]
    .value.split(",");
  var boyut;
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var ozellik = document.getElementById("noktaOzellik");
  if (ozellik.value === "Küçük") {
    boyut = 4;
  } else if (ozellik.value === "Orta") {
    boyut = 6;
  } else if (ozellik.value === "Büyük") {
    boyut = 8;
  }
  ctx.fillRect(koordinat[0], koordinat[1], boyut, boyut);
}

function cizgiCiz() {
  var boyut;
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var koordinatlar = document.getElementsByClassName("koordinat");

  for (let i = 0; i < koordinatlar.length; i++) {
    var koordinat = koordinatlar[i].value.split(",");
    if (i === 0) {
      ctx.beginPath();
      ctx.moveTo(koordinat[0], koordinat[1]);
    } else {
      ctx.lineTo(koordinat[0], koordinat[1]);
    }
  }

  var ozellik = document.getElementById("cizgiOzellik");
  if (ozellik.value === "İnce") {
    boyut = 1;
  } else if (ozellik.value === "Orta") {
    boyut = 3;
  } else if (ozellik.value === "Kalın") {
    boyut = 5;
  }
  ctx.lineWidth = boyut;
  ctx.stroke();
}

function poligonCiz() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var koordinatlar = document.getElementsByClassName("koordinat");

  for (let i = 0; i < koordinatlar.length; i++) {
    var koordinat = koordinatlar[i].value.split(",");
    if (i === 0) {
      ctx.beginPath();
      ctx.moveTo(koordinat[0], koordinat[1]);
    } else {
      ctx.lineTo(koordinat[0], koordinat[1]);
    }
  }

  ctx.closePath();

  var ozellik = document.getElementById("poligonOzellik");

  if (ozellik.value === "İçi Dolu") {
    ctx.fillStyle = "red";
    ctx.fill();
  } else if (ozellik.value === "İçi Taralı") {
    var p = document.createElement("canvas");

    p.width = 32;
    p.height = 16;
    var pctx = p.getContext("2d");

    var x0 = 36;
    var x1 = -4;
    var y0 = -2;
    var y1 = 18;
    var offset = 32;

    pctx.strokeStyle = "red";
    pctx.lineWidth = 2;
    pctx.beginPath();
    pctx.moveTo(x0, y0);
    pctx.lineTo(x1, y1);
    pctx.moveTo(x0 - offset, y0);
    pctx.lineTo(x1 - offset, y1);
    pctx.moveTo(x0 + offset, y0);
    pctx.lineTo(x1 + offset, y1);
    pctx.stroke();

    ctx.fillStyle = ctx.createPattern(p, "repeat");
    ctx.fill();
  }
  ctx.stroke();
}
