# YoutubeDownPlayer
A react Native App

## Requirements
npm

## Install work environment

npm install

**Fix Module bug : fix-duplicate-on-error-android-rn39**\
Open **node_modules/react-native-youtube/RCTYouTube/src/main/java/com/inprogress/reactnativeyoutube/YouTubeManager.java**

     replace on line 54 --> MapBuilder.of("registrationName", "onError"), by MapBuilder.of("registrationName", "onYoutubeVideoError"),
     replace on line 56 --> MapBuilder.of("registrationName", "onReady"), by MapBuilder.of("registrationName", "onYoutubeVideoReady"),
     replace on line 58 --> MapBuilder.of("registrationName", "onChangeState"), by  MapBuilder.of("registrationName", "onYoutubeVideoChangeState"),
     replace on line 60 --> MapBuilder.of("registrationName", "onChangeQuality") by MapBuilder.of("registrationName", "onYoutubeVideoChangeQuality")