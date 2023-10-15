const quoteContainer = document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const twitterBtn = document.getElementById('twitter-button');
const newQuoteBtn = document.getElementById('new-quote');
const authorText = document.getElementById('author');
const loader = document.getElementById('loader');


let apiQuotes = [];

//Show Loading
function loading() {

    loader.hidden = false;
    quoteContainer.hidden = true;
    

}

//Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;

}


//Show New Quote
function newQuote() {
    loading();
    //Pick a random quote from array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);

    //Check if author field is blank and replace with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown'; 
    }
    else {
        authorText.textContent = quote.author; 
    }

    //Check for quote length
    if (quote.text.length > 150) {
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }
  //Set quote and complete loading
    quoteText.textContent = quote.text;
    complete();
}

//Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {

        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    } catch(error) {
        //Catch error here
    }
}

//Tweet Quote
function tweetQuote() {
     const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
     window.open(twitterUrl, '_blank');
 }

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);





//On Load
getQuotes();
