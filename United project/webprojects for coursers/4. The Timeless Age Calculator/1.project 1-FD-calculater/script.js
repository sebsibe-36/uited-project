function calculateMaturityAmount(){

    const principle = parseFloat(document.getElementById('principle').value);
    const interstRate = parseFloat(document.getElementById('interstRate').value);
    const tenure = parseFloat(document.getElementById('tenure').value);

    const maturityAmount = principle + (principle * interstRate * tenure)/100;


    document.getElementById('result').innerText = `maturity Amount: ${maturityAmount.toFixed(2)}`;
}



document.getElementById('calculateBtn').addEventListener('click',calculateMaturityAmount);