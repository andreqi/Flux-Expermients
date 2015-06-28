/* @flow */

//import type {TreeNode} from '../stores/TreeStore';

type Rectangle = {
  width: number,
  height: number,
  x: number,
  y: number,
  idx?: number,
}

class Tiling {
  getRectangles(
    height: number,
    width: number,
    nodes: Array<Object>,
  ): Array<Rectangle> {
    var prefixSum = [0];
    var total = 0;
    nodes.forEach(node => {
      total += node.weight;
      prefixSum.push(total);
    });

    var rectangles = [];
    var split = function (
      left: number,
      right: number,
      rect: Rectangle,
      isVertical: boolean,
    ): void {
      if (left == right) {
        console.log(rect.height * rect.width);
        rect.idx = nodes[left - 1].idx;
        rectangles.push(rect);
        return;
      }
      var total = prefixSum[right] - prefixSum[left-1];
      for (var idx = left; idx <= right; idx++) {
        var value = prefixSum[idx] - prefixSum[left-1];
        if (value * 2 <= total) {
          mid = idx;
        }
      }
      var mid = Math.trunc((left + right) / 2);
      var sumRight = prefixSum[right] - prefixSum[mid];
      var sumLeft = prefixSum[mid] - prefixSum[left - 1];
      var prcLeft = sumLeft / (sumLeft + sumRight);
      var prcRight = 1 - prcLeft;
      var shiftX = !isVertical ? prcLeft * rect.width: 0;
      var shiftY = isVertical ? prcLeft * rect.height: 0;
      split(
        left,
        mid,
        {
          width: rect.width * (isVertical ? 1 : prcLeft),
          height: rect.height * (!isVertical ? 1 : prcLeft),
          x: rect.x,
          y: rect.y,
        },
        !isVertical,
      );
      split(
        mid + 1,
        right,
        {
          width: rect.width * (isVertical ? 1 : prcRight),
          height: rect.height * (!isVertical ? 1 : prcRight),
          x: rect.x + shiftX,
          y: rect.y + shiftY,
        },
        !isVertical,
      );
    };

    split(1, nodes.length, {
      width,
      height,
      x: 0,
      y: 0,
    }, false);

    return rectangles;
  }
}

module.exports = new Tiling();
