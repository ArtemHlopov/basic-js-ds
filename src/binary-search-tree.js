const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootPos = null;
  }
  root() {
    if (this.rootPos) {
      return this.rootPos;
    } else {
      return null;
    }
  }

  add(data) {
    this.rootPos = addData(this.rootPos, data);

    function addData(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addData(node.left, data);
      } else {
        node.right = addData(node.right, data);
      }
      return node;
    }
  }
  has(data) {
    return searchNode(this.rootPos, data);

    function searchNode(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return data < node.data
        ? searchNode(node.left, data)
        : searchNode(node.right, data);
    }
  }

  find(data) {
    return findNode(this.rootPos, data);

    function findNode(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        return findNode(node.left, data);
      } else {
        return findNode(node.right, data);
      }
    }
  }

  remove(data) {
    this.rootPos = delEl(this.rootPos, data);
    function delEl(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = delEl(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = delEl(node.right, data);
        return node;
      } else {
        if (!node.right) {
          node = node.left;
          return node;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.left && !node.right) {
          return null;
        }
        let minR = node.right;
        while (minR.left) {
          minR = minR.left;
        }
        node.data = minR.data;

        node.right = delEl(node.right, minR.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootPos) {
      return;
    }
    let cur = this.rootPos;
    while (cur.left) {
      cur = cur.left;
    }
    return cur.data;
  }

  max() {
    if (!this.rootPos) {
      return;
    }
    let cur = this.rootPos;
    while (cur.right) {
      cur = cur.right;
    }
    return cur.data;
  }
}

module.exports = {
  BinarySearchTree,
};
