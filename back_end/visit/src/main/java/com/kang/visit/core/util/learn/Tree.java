package com.kang.visit.core.util.learn;

public class Tree {

    class TreeNode{
        TreeNode leftChild;
        TreeNode rightChild;
        Integer num;
        TreeNode(Integer num){
            this.num=num;
        }
    }

    /*
        二叉平衡树添加节点
     */
    public TreeNode addTreeNode(TreeNode root,Integer num){
        if(root==null){
            root=new TreeNode(num);
            return root;
        }
        TreeNode currentNode=root;
        while(true){
            // 1、获得当前节点值
            Integer currentNodeNum=currentNode.num;
            // 2、若待加入值比当前节点值大，则查询当前节点的右子树
            if(num>currentNodeNum){
                if(currentNode.rightChild!=null){
                    // 右子树不为空，则将右子树作为当前节点，进行下次循环
                    currentNode=currentNode.rightChild;
                }else{
                    // 右子树为空，将值加入此位置
                    currentNode.rightChild=new TreeNode(num);
                    return root;
                }
            }else{
                if(currentNode.leftChild!=null){
                    currentNode=currentNode.leftChild;
                }else {
                    currentNode.leftChild=new TreeNode(num);
                    return root;
                }
            }
        }
    }

    /*
        前序遍历
    */
    public void preOrder(TreeNode treeNode){
        if(treeNode.leftChild!=null){
            System.out.print(treeNode.leftChild.num+"\t");
            preOrder(treeNode.leftChild);
        }
        if(treeNode.rightChild!=null){
            System.out.print(treeNode.rightChild.num+"\t");
            preOrder(treeNode.rightChild);
        }
    }

    /*
        中序遍历
     */
    public void inorderTraversal(TreeNode treeNode){
        if(treeNode.leftChild!=null){
            inorderTraversal(treeNode);
        }
        System.out.println(treeNode.num);
    }

    public static void main(String[] args) {
        Tree tree =new Tree();
        TreeNode root=null;
        root= tree.addTreeNode(root,5);
        root= tree.addTreeNode(root,2);
        root= tree.addTreeNode(root,7);
        root= tree.addTreeNode(root,1);
        root= tree.addTreeNode(root,3);
        root= tree.addTreeNode(root,6);
        root= tree.addTreeNode(root,8);

        System.out.print(root.num+"\t");
        tree.preOrder(root);
    }
}
