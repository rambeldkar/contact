import React, { useEffect, useState } from "react";
import { Form, Input} from 'antd';
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
export const Add = () => {
    const [post, setPost] = useState([]);
    const history = useHistory();
    const params = useParams();
    useEffect(() => {
        getPost();
    }, [params.id]);

    const formSubmit = (event) => {
        event.preventDefault();

        const createResult = createContact();
        createResult && console.log("Success! post created");
    };

    //   fetch post
    const getPost = () => {
        axios
            .get(`http://localhost:4000/contacts/${params.id}`)
            .then((response) => {
                if (response.status === 200) {
                    setPost(() => response?.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //   create post
    const createContact = () => {
        axios
            .post("http://localhost:4000/contacts", {
                firstName: post?.firstName,
                lastName: post?.lastName,
                email: post?.email,
                phoneNumber: post?.phoneNumber,
                status: post?.status ? post?.status : 'Active',
            })
            .then((response) => {
                console.log(response);
                if (response && response?.status === 201) {
                    history.push('/');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };


    //   onchange event
    const onChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form method={"POST"} onSubmit={(e) => formSubmit(e)}>
            <h1> Add Contacts</h1>
            <br/>
            <Form.Item label="First Name">
                <Input name="firstName" required onChange={(e) => onChange(e)} />
            </Form.Item>
            <Form.Item label="Last Name" >
                <Input name="lastName" required onChange={(e) => onChange(e)} />
            </Form.Item>
            <Form.Item label="Email">
                <Input name="email" required onChange={(e) => onChange(e)} />
            </Form.Item>
            <Form.Item label="Phone Number">
                <Input  name="phoneNumber" required onChange={(e) => onChange(e)} />
            </Form.Item>
            <button type="submit" class="ant-btn ant-btn-primary">
                Save
            </button>
        </form>
    );
};

export default Add