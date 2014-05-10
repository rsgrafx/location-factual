/**
* GuidesController Module
*
* Description
*/
angular.module('dashboard.guides', [])
.controller('GuidesCtrl', ['$scope', function GuidesCtrl($scope){

  $scope.setupEditPane = function() {
    (function() {
      var advancedEditor, authorship, basicEditor, cursorManager;

      advancedEditor = new Quill('.advanced-wrapper .editor-container', {
        modules: {
          'authorship': {
            enabled: true
          },
          'toolbar': {
            container: '.advanced-wrapper .toolbar-container'
          },
          'link-tooltip': true,
          'image-tooltip': true,
          'multi-cursor': true
        },
        theme: 'snow'
      });

      authorship = advancedEditor.getModule('authorship');

      authorship.addAuthor('basic', 'rgba(255,153,51,0.4)');

      cursorManager = advancedEditor.getModule('multi-cursor');

      cursorManager.setCursor('basic', 0, 'basic', 'rgba(255,153,51,0.9)');

      advancedEditor.on('selection-change', function(range) {
        return console.log('advanced', 'selection', range);
      });

      advancedEditor.on('text-change', function(delta, source) {
        var sourceDelta, targetDelta;
        console.log('advanced', 'text', delta, source);
        if (source === 'api') {
          return;
        }
        basicEditor.updateContents(delta);
        sourceDelta = advancedEditor.getContents();
        targetDelta = basicEditor.getContents();
        return console.assert(sourceDelta.isEqual(targetDelta), "Editor diversion!", sourceDelta, targetDelta);
      });

    }).call(this);
  }
  
}])