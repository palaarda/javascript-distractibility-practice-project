new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Electra",
          artist: "Airstream",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
          source: "./mp3/1.mp3",
          url: "https://www.youtube.com/watch?v=kgBjvXcHvS8",
          favorited: false
        },
        {
          name: "Wandering Star",
          artist: "Portishead",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
          source: "./mp3/2.mp3",
          url: "https://www.youtube.com/watch?v=8T0cRt8efsQ",
          favorited: true
        },
        {
          name: "Extreme Ways",
          artist: "Moby",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/14.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
          url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
          favorited: false
        },
        {
          name: "Chill Lofi Study/ Work Deep Focused Beats",
          artist: "Incognit Ninja",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/16.jpg",
          source: "./mp3/4.mp3",
          url: "https://www.youtube.com/watch?v=13KqBZjLUZw",
          favorited: false
        },
        {
          name: "Remains of Nothing",
          artist: "Archive, Nand Of Skulls",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
          source: "./mp3/5.mp3",
          url: "https://www.youtube.com/watch?v=5rMjPK9kJks",
          favorited: true
        },
        {
          name: "Hotel California",
          artist: "Eagles",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
          source: "./mp3/6.mp3",
          url: "https://www.youtube.com/watch?v=09839DpTctU",
          favorited: false
        },
        {
          name: "Side 1, Pt. 3: Ebb and Flow",
          artist: "Pink Floyd",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
          source: "./mp3/7.mp3",
          url: "https://www.youtube.com/watch?v=LgBoQxutn8M",
          favorited: true
        },
        {
          name: "Comfortably Numb",
          artist: "Pink Floyd",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
          source: "./mp3/8.mp3",
          url: "https://www.youtube.com/watch?v=x-xTttimcNk",
          favorited: false
        },
        {
          name: "Benim Derdim (Live | ROUNDS | Vevo)",
          artist: "Ezhel",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
          source: "./mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=gjRtYZD2W4w",
          favorited: false
        },
        {
          name: "Stairway To Heaven (Official Audio)",
          artist: "Led Zeppelin",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/10.jpg",
          source: "./mp3/10.mp3",
          url: "https://www.youtube.com/watch?v=QkF3oxziUI4",
          favorited: false
        },
        {
          name: "Hoşçakal Kadar",
          artist: "Büyük Ev Ablukada",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/19.jpg",
          source: "./mp3/11.mp3",
          url: "https://www.youtube.com/watch?v=Ew_yAxw4VhM",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});

