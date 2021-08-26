
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/



/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

import { __extends } from "tslib";
import * as zrUtil from 'zrender/esm/core/util';
import * as textContain from 'zrender/esm/contain/text';
import * as graphic from '../../util/graphic';
import { enterEmphasis, leaveEmphasis } from '../../util/states';
import Model from '../../model/Model';
import DataDiffer from '../../data/DataDiffer';
import * as listComponentHelper from '../helper/listComponent';
import ComponentView from '../../view/Component';
import { ToolboxFeature, getFeature } from './featureManager';
import { getUID } from '../../util/component';
import ZRText from 'zrender/esm/graphic/Text';

var ToolboxView = function (_super) {
  __extends(ToolboxView, _super);

  function ToolboxView() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  ToolboxView.prototype.render = function (toolboxModel, ecModel, api, payload) {
    var group = this.group;
    group.removeAll();

    if (!toolboxModel.get('show')) {
      return;
    }

    var itemSize = +toolboxModel.get('itemSize');
    var featureOpts = toolboxModel.get('feature') || {};
    var features = this._features || (this._features = {});
    var featureNames = [];
    zrUtil.each(featureOpts, function (opt, name) {
      featureNames.push(name);
    });
    new DataDiffer(this._featureNames || [], featureNames).add(processFeature).update(processFeature).remove(zrUtil.curry(processFeature, null)).execute();
    this._featureNames = featureNames;

    function processFeature(newIndex, oldIndex) {
      var featureName = featureNames[newIndex];
      var oldName = featureNames[oldIndex];
      var featureOpt = featureOpts[featureName];
      var featureModel = new Model(featureOpt, toolboxModel, toolboxModel.ecModel);
      var feature;

      if (payload && payload.newTitle != null && payload.featureName === featureName) {
        featureOpt.title = payload.newTitle;
      }

      if (featureName && !oldName) {
        if (isUserFeatureName(featureName)) {
          feature = {
            onclick: featureModel.option.onclick,
            featureName: featureName
          };
        } else {
          var Feature = getFeature(featureName);

          if (!Feature) {
            return;
          }

          feature = new Feature();
        }

        features[featureName] = feature;
      } else {
        feature = features[oldName];

        if (!feature) {
          return;
        }
      }

      feature.uid = getUID('toolbox-feature');
      feature.model = featureModel;
      feature.ecModel = ecModel;
      feature.api = api;

      if (feature instanceof ToolboxFeature) {
        if (!featureName && oldName) {
          feature.dispose && feature.dispose(ecModel, api);
          return;
        }

        if (!featureModel.get('show') || feature.unusable) {
          feature.remove && feature.remove(ecModel, api);
          return;
        }
      }

      createIconPaths(featureModel, feature, featureName);

      featureModel.setIconStatus = function (iconName, status) {
        var option = this.option;
        var iconPaths = this.iconPaths;
        option.iconStatus = option.iconStatus || {};
        option.iconStatus[iconName] = status;

        if (iconPaths[iconName]) {
          (status === 'emphasis' ? enterEmphasis : leaveEmphasis)(iconPaths[iconName]);
        }
      };

      if (feature instanceof ToolboxFeature) {
        if (feature.render) {
          feature.render(featureModel, ecModel, api, payload);
        }
      }
    }

    function createIconPaths(featureModel, feature, featureName) {
      var iconStyleModel = featureModel.getModel('iconStyle');
      var iconStyleEmphasisModel = featureModel.getModel(['emphasis', 'iconStyle']);
      var icons = feature instanceof ToolboxFeature && feature.getIcons ? feature.getIcons() : featureModel.get('icon');
      var titles = featureModel.get('title') || {};
      var iconsMap;
      var titlesMap;

      if (typeof icons === 'string') {
        iconsMap = {};
        iconsMap[featureName] = icons;
      } else {
        iconsMap = icons;
      }

      if (typeof titles === 'string') {
        titlesMap = {};
        titlesMap[featureName] = titles;
      } else {
        titlesMap = titles;
      }

      var iconPaths = featureModel.iconPaths = {};
      zrUtil.each(iconsMap, function (iconStr, iconName) {
        var path = graphic.createIcon(iconStr, {}, {
          x: -itemSize / 2,
          y: -itemSize / 2,
          width: itemSize,
          height: itemSize
        });
        path.setStyle(iconStyleModel.getItemStyle());
        var pathEmphasisState = path.ensureState('emphasis');
        pathEmphasisState.style = iconStyleEmphasisModel.getItemStyle();
        var textContent = new ZRText({
          style: {
            text: titlesMap[iconName],
            align: iconStyleEmphasisModel.get('textAlign'),
            borderRadius: iconStyleEmphasisModel.get('textBorderRadius'),
            padding: iconStyleEmphasisModel.get('textPadding'),
            fill: null
          },
          ignore: true
        });
        path.setTextContent(textContent);
        var tooltipModel = toolboxModel.getModel('tooltip');

        if (tooltipModel && tooltipModel.get('show')) {
          path.tooltip = zrUtil.extend({
            content: titlesMap[iconName],
            formatter: tooltipModel.get('formatter', true) || function () {
              return titlesMap[iconName];
            },
            formatterParams: {
              componentType: 'toolbox',
              name: iconName,
              title: titlesMap[iconName],
              $vars: ['name', 'title']
            },
            position: tooltipModel.get('position', true) || 'bottom'
          }, tooltipModel.option);
        }

        path.__title = titlesMap[iconName];
        path.on('mouseover', function () {
          var hoverStyle = iconStyleEmphasisModel.getItemStyle();
          var defaultTextPosition = toolboxModel.get('orient') === 'vertical' ? toolboxModel.get('right') == null ? 'right' : 'left' : toolboxModel.get('bottom') == null ? 'bottom' : 'top';
          textContent.setStyle({
            fill: iconStyleEmphasisModel.get('textFill') || hoverStyle.fill || hoverStyle.stroke || '#000',
            backgroundColor: iconStyleEmphasisModel.get('textBackgroundColor')
          });
          path.setTextConfig({
            position: iconStyleEmphasisModel.get('textPosition') || defaultTextPosition
          });
          textContent.ignore = !toolboxModel.get('showTitle');
          enterEmphasis(this);
        }).on('mouseout', function () {
          if (featureModel.get(['iconStatus', iconName]) !== 'emphasis') {
            leaveEmphasis(this);
          }

          textContent.hide();
        });
        (featureModel.get(['iconStatus', iconName]) === 'emphasis' ? enterEmphasis : leaveEmphasis)(path);
        group.add(path);
        path.on('click', zrUtil.bind(feature.onclick, feature, ecModel, api, iconName));
        iconPaths[iconName] = path;
      });
    }

    listComponentHelper.layout(group, toolboxModel, api);
    group.add(listComponentHelper.makeBackground(group.getBoundingRect(), toolboxModel));
    group.eachChild(function (icon) {
      var titleText = icon.__title;
      var emphasisState = icon.ensureState('emphasis');
      var emphasisTextConfig = emphasisState.textConfig || (emphasisState.textConfig = {});
      var textContent = icon.getTextContent();
      var emphasisTextState = textContent && textContent.states.emphasis;

      if (emphasisTextState && !zrUtil.isFunction(emphasisTextState) && titleText) {
        var emphasisTextStyle = emphasisTextState.style || (emphasisTextState.style = {});
        var rect = textContain.getBoundingRect(titleText, ZRText.makeFont(emphasisTextStyle));
        var offsetX = icon.x + group.x;
        var offsetY = icon.y + group.y + itemSize;
        var needPutOnTop = false;

        if (offsetY + rect.height > api.getHeight()) {
          emphasisTextConfig.position = 'top';
          needPutOnTop = true;
        }

        var topOffset = needPutOnTop ? -5 - rect.height : itemSize + 8;

        if (offsetX + rect.width / 2 > api.getWidth()) {
          emphasisTextConfig.position = ['100%', topOffset];
          emphasisTextStyle.align = 'right';
        } else if (offsetX - rect.width / 2 < 0) {
          emphasisTextConfig.position = [0, topOffset];
          emphasisTextStyle.align = 'left';
        }
      }
    });
  };

  ToolboxView.prototype.updateView = function (toolboxModel, ecModel, api, payload) {
    zrUtil.each(this._features, function (feature) {
      feature instanceof ToolboxFeature && feature.updateView && feature.updateView(feature.model, ecModel, api, payload);
    });
  };

  ToolboxView.prototype.remove = function (ecModel, api) {
    zrUtil.each(this._features, function (feature) {
      feature instanceof ToolboxFeature && feature.remove && feature.remove(ecModel, api);
    });
    this.group.removeAll();
  };

  ToolboxView.prototype.dispose = function (ecModel, api) {
    zrUtil.each(this._features, function (feature) {
      feature instanceof ToolboxFeature && feature.dispose && feature.dispose(ecModel, api);
    });
  };

  ToolboxView.type = 'toolbox';
  return ToolboxView;
}(ComponentView);

ComponentView.registerClass(ToolboxView);

function isUserFeatureName(featureName) {
  return featureName.indexOf('my') === 0;
}