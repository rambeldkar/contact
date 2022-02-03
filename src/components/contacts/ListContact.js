import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from "axios";
import { useHistory } from "react-router-dom";

export const List = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getPosts();
  }, []);

  // get posts
  const getPosts = () => {
    axios
      .get(`http://localhost:4000/contacts/`)
      .then((response) => {
        if (response.status === 200) {
          setPosts(response?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  action click
  const actionClick = (data) => {
    data.e.stopPropagation();

    if (data && data?.action && data?.action?.type === "edit") {
      history.push(`/edit/${data?.post?.id}`);
      return false;
    } else if (data && data?.action && data?.action?.type === "delete") {
      deletePost(data?.post?.id);
      return false;
    }
  };

  //  delete post
  const deletePost = (postId) => {
    axios
      .delete(`http://localhost:4000/contacts/${postId}`)
      .then((response) => {
        console.log(response?.status);
        if (response && response?.status === 200) {
          history.go('');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => <Tag color="#87d068">{text}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (post) => (
        <>
          <Link
            to={"#"}
            onClick={(e) =>
              actionClick({ action: { type: "edit" }, post, e })
            }
            title={"Edit"}
          >
            <EditOutlined/> Edit
          </Link>&nbsp;&nbsp;
          <Link
            to={"#"}
            className="ms-3"
            onClick={(e) =>
              actionClick({ action: { type: "delete" }, post, e })
            }
            title={"Delete"}
            style={{color:'red'}}
          >
            <DeleteOutlined /> Delete
          </Link>
        </>
      ),
    },
  ];
  const data = [];
  {
    posts.map((post) => {
      data.push({
        key: post.id,
        id: post.id,
        firstName: post.firstName,
        lastName: post.lastName,
        email: post.email,
        phoneNumber: post.phoneNumber,
        status: post.status,
      });
    })
  }
  return (
    <>
      <Link to={`/add`} className="ant-btn ant-btn-primary"><PlusOutlined /> Add Contact</Link>
      <Table dataSource={data} columns={columns} pagination={false}/>
    </>
  );
};

export default List