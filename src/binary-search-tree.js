const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  } 

  root() {
    return this.rootNode
  }

  add(data) {
    this.rootNode = addNode(this.rootNode, data);
    function addNode(node, data) {
      if (!node) {
        return new Node(data);
      } if (node.data === data) {
        return node;
      } if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    let currentNode = this.rootNode
    while (currentNode) {
      if (data === currentNode.data) {
        return true
      } if (data < currentNode.data) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }
    return false
  }

  find(data) {
    let currentNode = this.rootNode
    while (currentNode.data !== data) {
      if (data < currentNode.data) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      } if (!currentNode) {
        return null
      }
    }
    return currentNode
  }

  remove(data) {
    this.rootNode = removeData(this.rootNode, data)
    function removeData(node, data) {
      if (!node) {
        return null
      } if (data < node.data) {
        node.left = removeData(node.left, data)
        return node
      } else if (data > node.data) {
        node.right = removeData(node.right, data)
        return node
      } else {
        if (!node.left && !node.right) {
          return null
        } if (!node.left) {
          node = node.right
          return node
        } if (!node.right) {
          node = node.left
          return node
        }
        let minRight = node.right
        while (minRight.left) {
          minRight = minRight.left
        }
        node.data = minRight.data
        node.right = removeData(node.right, minRight.data)
        return node
      }
    }
  }

  min() {
    if (!this.rootNode) {
      return;
    }

    let node = this.rootNode
    while (node.left) { node = node.left }
    return node.data
  }

  max() {
    if (!this.rootNode) {
      return;
    }

    let node = this.rootNode
    while (node.right) { node = node.right }
    return node.data
  }
}

module.exports = {
  BinarySearchTree
};