class ScenesManager {
  constructor(app) {
    this.app = app;
    this.scenes = [];
    this.currentScene = null;
  }

  addScene(sceneId, Scene) {
    const createdScene = new Scene(this.app);
    this.scenes[sceneId] = createdScene;
    //this.scenes.push(createdScene);
    console.log('Scenes', this.scenes);
  }

  goTo(sceneId) {
    if (this.currentScene && this.currentScene.sceneId !== sceneId) {
      this.app.sceneContainer.removeChild(this.currentScene);
    }

    this.currentScene = this.scenes[sceneId];
    this.app.state = this.currentScene;

    this.app.sceneContainer.addChild(this.currentScene);
  }
}

export { ScenesManager };
