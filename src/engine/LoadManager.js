export class LoadManager {
  constructor() {
    // this.loader.add('/assets/assets.json').on('progress', this.onProgressLoader).load(this.onLoaderComplete)
    this.on('progress', this.onProgressLoader);
    this.on('complete', this.onLoaderComplete);
  }

  onProgressLoader(loader, resource) {
    console.log('loading', resource.url, loader.progress);
  }

  onLoaderComplete() {
    console.log('Done');
  }
}
