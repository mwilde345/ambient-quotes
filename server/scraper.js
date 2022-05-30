const { default: axios } = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");
const wordsCount = require("words-count").default;
const ffmpeg = require("fluent-ffmpeg");

const scrape = () => {
  const textFile = fs.readFileSync("./data/text.txt").toString();
  const contents = textFile.split("\n\n");
  const linkToText = {};
  let currentText = "";
  contents.forEach((item) => {
    if (!item.startsWith("http")) {
      currentText += item;
    } else {
      linkToText[item] = currentText;
      currentText = "";
    }
  });
  // console.log(linkToText);
  const quote =
    "It is proposed that the First Presidency sustain Russell Marion Nelson as prophet, seer, and revelator and President of The Church of Jesus Christ of Latter-day Saints.";
  let link =
    "https://www.churchofjesuschrist.org/study/general-conference/2018/04/solemn-assembly?id=p10&lang=eng#p10";
  axios.get(link).then((result) => {
    const html = result.data;
    const $ = cheerio.load(html);
    const fullText = $("#content").text();
    const quoteStartLocation = fullText.indexOf(quote);
    const allWordCount = wordsCount(fullText);
    const textBeforeQuote = fullText.slice(0, quoteStartLocation);
    const beforeQuoteCount = wordsCount(textBeforeQuote);
    const endQuoteCount = beforeQuoteCount + wordsCount(quote);
    const locationRatio = beforeQuoteCount / allWordCount;
    const locationEndRatio = endQuoteCount / allWordCount;
    ffmpeg.ffprobe("./data/audio.mp3", function (err, metadata) {
      // console.log(metadata); // all metadata
      const audioLength = metadata.format.duration;
      const durationToQuote = audioLength * locationRatio;
      const quoteDuration = audioLength * locationEndRatio - durationToQuote;
      const errorMargin = 0.03 * audioLength;
      console.log("quote length", quoteDuration);
      console.log("error margin", errorMargin);
      ffmpeg("./data/audio.mp3")
        .seekInput(durationToQuote - errorMargin)
        .duration(quoteDuration) // calculate using time of end of quote
        // .outputFormat("libmp3")
        .on("error", function (err) {
          console.log("An error occurred: " + err.message);
        })
        .on("end", function () {
          console.log("Processing finished !");
        })
        .save("./data/audio-clip.mp3");
    });
  });
};

scrape();

module.exports = {
  scrape,
};
