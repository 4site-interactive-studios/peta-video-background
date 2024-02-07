type VideoOption = {
  "desktop-video": string;
  "mobile-video": string;
  "desktop-poster": string;
  "mobile-poster": string;
};

export class PETAVideoBackground {
  private _videos: {
    [key: string]: VideoOption;
  } = {
    default: {
      "desktop-video":
        "https://apps.4sitestudios.com/fernando/peta/videos/third.mp4",
      "mobile-video":
        "https://apps.4sitestudios.com/fernando/peta/videos/clip_16x9.mp4",
      "desktop-poster": "https://picsum.photos/900/1600",
      "mobile-poster": "https://picsum.photos/1600/900",
    },
  };
  private _video: VideoOption | false = false;
  private _desktopContainer: HTMLDivElement = document.createElement("div");
  private _mobileContainer: HTMLDivElement = document.createElement("div");
  private _overlay: HTMLDivElement = document.createElement("div");

  constructor() {
    this.log("Debug mode is on");
    this.loadVideosOptions();
    this._video = this.getVideo();
    if (!this.shouldRun()) {
      this.log("Not Running");
      return;
    }
    // Document Load
    if (document.readyState !== "loading") {
      this.run();
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        this.run();
      });
    }
  }

  private run() {
    // console.log(this._containers, this._fields);
    this.createDesktopContainer();
    this.createMobileContainer();
    document.body.classList.add("has-peta-video-background");
  }
  private createDesktopContainer() {
    if (!this._video) return;
    if (!this._video["desktop-video"]) {
      this.log("Desktop Video not found");
      return;
    }
    this.log("Creating Desktop Container");
    this._desktopContainer.classList.add("peta-video-container");
    this._overlay.classList.add("peta-video-overlay");
    this.writeVideo(this._desktopContainer, "desktop");
    this._desktopContainer.appendChild(this._overlay);
    document.body.appendChild(this._desktopContainer);
  }
  private createMobileContainer() {
    if (!this._video) return;
    if (!this._video["mobile-video"]) {
      this.log("Mobile Video not found");
      return;
    }
    if (this.isThankYouPage()) {
      this.log("No Mobile Container on Thank You Page");
      return;
    }
    this.log("Creating Mobile Container");
    this._mobileContainer.classList.add("peta-video-mobile-container");
    this.writeVideo(this._mobileContainer, "mobile");
    // The target is a div with an inline style containing "border-top-left-radius"
    const target = document.querySelector(
      "div.en__component[style*='border-top-left-radius'] .en__component--copyblock"
    );
    if (target) {
      // Add the video container as the first child of the target
      target.insertBefore(this._mobileContainer, target.firstChild);
    } else {
      this.log("Mobile Target not found");
    }
  }

  private isThankYouPage() {
    const pageJson = (window as any).pageJson || {};
    return (
      pageJson &&
      "pageNumber" in pageJson &&
      "pageCount" in pageJson &&
      pageJson.pageNumber === pageJson.pageCount
    );
  }

  private shouldRun(): boolean {
    if (!this._video) {
      this.log("Video is disabled");
      return false;
    }
    this.log("Running");
    return true;
  }
  private loadVideosOptions() {
    if (
      "PETAVideoBackground" in window &&
      typeof window.PETAVideoBackground === "object"
    ) {
      // Merge videos
      this._videos = { ...this._videos, ...window.PETAVideoBackground };
    }
  }
  // User can set a ?video=videoName to use a specific video
  // If the video is not found, it will use the default video
  private getVideo() {
    const regex = new RegExp("[\\?&]video=([^&#]*)");
    const results = regex.exec(location.search);
    if (results === null) return this._videos.default;
    const video = decodeURIComponent(results[1].replace(/\+/g, " "));
    if (video === "false") return false;
    if (video in this._videos) {
      this.log(`Using video: ${video}`);
      return this._videos[video];
    }
    this.log(`Video not found: ${video}`);
    this.log(`Using default video`);
    return this._videos.default;
  }
  private writeVideo(
    where: HTMLElement | string,
    kind: "desktop" | "mobile" = "desktop"
  ) {
    if (!this._video) return;
    const container =
      typeof where === "string" ? document.querySelector(where) : where;
    if (!container) {
      this.log(`Container not found: ${where}`);
      return;
    }
    const video = document.createElement("video");
    video.loop = true;
    video.playsInline = true;
    video.muted = true;
    video.autoplay = true;
    video.style.width = "100%";
    video.style.height = kind === "desktop" ? "100vh" : "auto";
    video.style.opacity = "1";
    video.poster = this._video[`${kind}-poster`];

    const source = document.createElement("source");
    source.src = this._video[`${kind}-video`];
    source.type = source.src.endsWith(".webm") ? "video/webm" : "video/mp4";
    video.appendChild(source);
    container.appendChild(video);
  }
  private isDebug() {
    const regex = new RegExp("[\\?&]debug=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  private log(message: string | object) {
    if (this.isDebug()) {
      let messageString = message;
      if (typeof message === "object") {
        messageString = JSON.stringify(message);
      }

      console.log(
        `%cPETA Video BG: ${messageString}`,
        "color: white; background: rgb(7, 15, 42); font-size: 1.2rem; font-weight: bold; padding: 2px; border-radius: 2px;"
      );
    }
  }
}
