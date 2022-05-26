- Speech to text to map word groups to video timestamp
- Load text, when they highlight, generate button to extract the audio, or add a timestamp marker.
- Load iframe with the highlights on the church website and scrape those away.
- Feature wall for mapping text highlights to audio/video timestamps. Free to mark timestamps manually.
- i transcribe each conference all talks. access to them behind subscription. 2 cents/minute transcribe
- i keep a db of all audio/video links for conferences. searchable.
- or make it more general and do the link input, not just conference.

Flow:

- organize by projects, can stop and start working on them.
- add quote sources. Each source object can have text, audio, or video elements that can be viewed and interacted with. extra feature to mark up the text with timestamps.
- each source can have quote objects, these must map to an audio file (audio file generated from uploaded file, link to audio, or uploaded/linked video where audio is extracted from).
- if adding a video source, it will overwrite any audio source that has been added (get consent)
- if adding an audio source, it will delete any existing video source (get consent)
- while viewing audio or video source, adding a timestamp object to one will display it on the other.
  - Have a static timeline with quote snippets shown and change the currently displayed source, audio waveform or video. both views have "start" and "stop" buttons. waveform has shortcut key to set start and stop while hovering with cursor. Custom video timeline thing to do the same?
- can name each source or use a name generated from the input link/file.
- can name each quote object
- select ambient tracks (input/upload audio/video)
- drag/drop quote objects from sources onto timeline. or click button to insert at current timestamp.
- default to no fade in/out.
- clicking on a quote object in the timeline you can open a modal to shorten/increase it. saving it applies to the quote object everywhere.
- deleting quote object from timeline is ok, no warning. delete quote object from source while quote is on timeline triggers warning it will be removed from timeline.
- export to audio file for download. each export request kicks off a new generate process. Output file is versioned based on current project status. any changes to project cause a new export to give a new file. else generate gives cached file.

- store entire project in document with links to sources and timestamps and names, etc. When loading project, pull up audio/video/text files when the specific object is clicked. have a shared cache if loading conference files. cache based on source link (lds website e.g.)

Tooling:

- link to direct audio file, download and store audio file on cache, available for certain amount of time. not persisted on s3.
- same with video file.
- upload audio file or video file it is saved to my storage. each user gets storage quota.
- link to video, must fetch audio. need to download video first.
  - https://github.com/ytdl-node/ytdl
  - https://www.npmjs.com/package/youtube-mp3-downloader
- given a link to a page, use a scraper to try and find media sources. user chooses a source. or... for lds site, scrape for the download button.
