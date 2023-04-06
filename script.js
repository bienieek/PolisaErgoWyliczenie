

const gwarantowanaSuma = [0,0,0,0,10640, 13550, 16560, 19690, 22930, 26280, 29770, 33390, 37150,
    41060, 45110, 49320, 53680, 58210, 62910, 67780, 72840, 78070, 83500, 89120, 94950, 100980,
    107230, 113710, 120430, 127410, 134660, 142210, 150070, 158250, 166790, 175710, 185070, 194920,
    205280,  216270, 227270, 238290, 249330, 260410]



function  obliczZysk(wklad, lata, oprocentowanie) {

    let inflacja = 1.05;
    let nowaWartosc;

    nowaWartosc = oprocentowanie * wklad;

    let arrPieniadzeNaLokacieXOprocentowanie = [nowaWartosc];
    let arrPieniadzeNaLokacie = [wklad];

    for ( let i = 1; i<lata; i++ ){
         
        nowaWartosc = (nowaWartosc + wklad * Math.pow(inflacja,i)) * oprocentowanie
        staraWartosc = nowaWartosc/oprocentowanie

        arrPieniadzeNaLokacieXOprocentowanie.push(nowaWartosc)
        
        arrPieniadzeNaLokacie.push(staraWartosc)
    }

    // console.log(arrPieniadzeNaLokacie)
    // console.log(arrPieniadzeNaLokacieXOprocentowanie)

    let arrZysk = []

    for (let i = 0; i<arrPieniadzeNaLokacieXOprocentowanie.length; i++) {
        arrZysk.push(arrPieniadzeNaLokacieXOprocentowanie[i] - arrPieniadzeNaLokacie[i])
    }

    // console.log(arrZysk)

    let wyplata = 0;
    for(let i = 0; i <lata; i++) {
        
        wyplata += arrZysk[i]
    }

    arrWlozonePieniadze = []
    for(let i = 0; i <lata ; i++) {
        allWklad = wklad * Math.pow(inflacja,i)
        arrWlozonePieniadze.push(allWklad)
    }
    
    // console.log(arrWlozonePieniadze)
    let calkowityWkladPieniedzy = 0;

    for (let i = 0 ;i<lata; i++) {
        calkowityWkladPieniedzy += arrWlozonePieniadze[i]
    }

    // console.log(`${Math.round(wyplata)} = tyle wyciagne na oprocentowaniu ${oprocentowanie} przez ${lata} lat (obligacje ${wklad<1000 ? "20%" : "80%"}%) `)
    // console.log(`${Math.round(calkowityWkladPieniedzy)} = tyle wplace na obligacje ${wklad<1000 ? "20%" : "80%"} przez ${lata} lat`);

    
    let bilans = wyplata - calkowityWkladPieniedzy;
    
    console.log(`bilans = ${bilans} wyplata = ${wyplata} calkowityWklad = ${calkowityWkladPieniedzy}\n\n\n`)
    // console.log(`${Math.round(bilans)} taki jest bilans lokaty ${wklad<1000 ? "20%" : "80%"} przez ${lata} lata \n\n`)



    return Math.round(bilans)
// }
}
// obliczZysk(2400,5,1.045);
// obliczZysk(600,5,1.035)


function obliczCalkowityZysk (wklad, lata, oprocentowanieObligacji, oprocentowanieSamodzielnegoWyboru)  {
    
    wklad = wklad*12
    const calkowityZysk = obliczZysk(Number(wklad*0.8),lata,oprocentowanieObligacji) 
         + obliczZysk(Number(wklad*0.2),lata,oprocentowanieSamodzielnegoWyboru) + gwarantowanaSuma[lata-1]

    console.log(`${calkowityZysk} = calkowity zysk z polisy po ${lata} lat inwestowania z wkladem ${wklad/12}zl miesiecznie na start
        liczac oprocentowanie obligacji na poziomie ${oprocentowanieObligacji}% 
            + oprocentowanie samodziellnego wyboru na poziomie ${oprocentowanieSamodzielnegoWyboru}%
            ${gwarantowanaSuma[lata-1]}`)
}
 
 // zmieniona wartosc Wklad bedzie miala zle pokrycie w tabeli ze wzgledu na brak info odnosnie innych sum



//                WKLAD, LATA, %OBLIGACJE, %20%
obliczCalkowityZysk(250, 20, 1.045, 1.035)
