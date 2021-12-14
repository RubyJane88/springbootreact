import { getAxios, postAxios } from "httpClient/generic-api-calls";
import { StudentModel } from "models/studentModel";
import React, { useEffect, useState } from "react";
import { Table, Avatar, Spin, Modal } from "antd";
import Container from "@mui/material/Container";
import Icon from "@ant-design/icons/lib/components/Icon";
import Footer from "../components/Footer";
import AddStudentForm from "../forms/AddStudentForm";
import { errorNotification } from "../components/Notification";

const Student = () => {
  const getIndicatorIcon: any = () => (
    <Icon type={"loading"} style={{ fontSize: 24 }} />
  );

  const [students, setStudents] = useState<StudentModel[]>();
  const [isAddStudentModalVisible, setIsAddStudentModalVisible] =
    useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [columns] = useState([
    {
      title: "",
      key: "avatar",
      render: (text, students) => (
        <Avatar size={"large"}>
          {`${students.firstName.charAt(0).toUpperCase()}${students.lastName
            .charAt(0)
            .toUpperCase()}`}
        </Avatar>
      ),
    },

    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      //render: (text: string) => <a>{text}</a>,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
  ]);

  useEffect(() => {
    getStudents().then();
  }, []);

  const getStudents = async () => {
    try {
      setIsFetching(true);
      const { data } = await getAxios<StudentModel[]>("students");
      setStudents(data);
      setIsFetching(false);
    } catch (error) {
      errorNotification("Error getting all students", error.message);
      setIsFetching(false);
    }
  };

  const postNewStudent = async (student: StudentModel) => {
    const { data } = await postAxios<StudentModel>("students", student);
    setStudents([...students, data]);
  };

  const onSuccessfulSubmit = () => {
    closeAddStudentModal();
    getStudents().then();
  };

  const onFailureSubmit = (error: { message: any }) => {
    console.log(JSON.stringify(error), null, 2);
    errorNotification("Email is already taken", error.message);
  };

  const openAddStudentModal = () => {
    setIsAddStudentModalVisible(true);
  };

  const closeAddStudentModal = () => {
    setIsAddStudentModalVisible(false);
  };

  if (isFetching) {
    return <Container>{<Spin indicator={getIndicatorIcon} />}</Container>;
  }

  return (
    <Container>
      <h1>List of Students</h1>
      <Table dataSource={students} columns={columns} rowKey="studentId" />

      <Modal
        title="Add New Student"
        visible={isAddStudentModalVisible}
        onOk={closeAddStudentModal}
        onCancel={closeAddStudentModal}
        width={1000}
      >
        <AddStudentForm
          postNewStudent={postNewStudent}
          onSuccessfulSubmit={onSuccessfulSubmit}
          onFailureSubmit={onFailureSubmit}
        />
      </Modal>

      <div>
        <Footer
          numberOfStudent={students?.length}
          handleAddStudentClickEvent={openAddStudentModal}
        />
      </div>
    </Container>
  );
};

export default Student;
