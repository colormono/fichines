/**
 * Scenes manager
 *
 * Inspiration:
 * https://github.com/mveteanu/p5.SceneManager/blob/master/lib/scenemanager.js
 * https://github.com/Nazariglez/pixi-scene/blob/master/src/SceneManager.js
 * Add: findSceneIndex, findScene, isCurrent, getCurrent, getNextScene, getPreviousScene
 *
 * @param {PIXI.Application} app Pass the game app
 * @export {SceneManager}
 */
export class ScenesManager {
  constructor(app) {
    this.app = app;
    this.scenes = [];
    this.currentScene = null;
  }

  /**
   * Add Scene
   *
   * @param {String} sceneId
   * @param {PIXI.Container} Scene
   * @returns {null}
   */
  addScene(sceneId, Scene) {
    const createdScene = new Scene(this.app);
    this.scenes[sceneId] = createdScene;
  }

  /**
   * Go to scene
   *
   * @param {String} sceneId
   * @returns {null}
   */
  goTo(sceneId) {
    if (this.currentScene && this.currentScene.sceneId !== sceneId)
      this.app.sceneContainer.removeChild(this.currentScene);
    this.app.state = this.currentScene = this.scenes[sceneId];
    this.app.sceneContainer.addChild(this.currentScene);
    //return this.currentScene;
  }
}
