"use client";

import React, { ChangeEvent, useState } from "react";
import { Button, Modal, Switch } from "antd";
import { toast } from "react-toastify";
import Form from "../forms/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../forms/InputField";
import { auth } from "@/lib/firebase";
import UploadField from "./UploadField";
import { User, updateProfile } from "firebase/auth";
import {
  useGetUserDetailsByEmailQuery,
  useInsertUserDetailsIntoDBMutation,
  useUpdateUserDetailsInDBMutation,
} from "@/redux/features/user-details/userDetailsApi";
import { useAppDispatch } from "@/redux/hooks/hook";
import { fileUploadsApi } from "@/redux/features/file-uploads/fileUploadsApi";

type FormValues = {
  email: string;
  name: string;
  photoURL: string;
  file: string;
  phoneNumber: string;
  address: string;
};

const ModalUpdateProfile: React.FC = () => {
  const [switchChecked, setSwitchChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [file, setFile] = useState<(string | Blob) | null>(null);

  const user = auth.currentUser;
  let email;

  if (user) {
    email = user.email;
  }

  const [insertUserDetailsIntoDB, { isLoading }] = useInsertUserDetailsIntoDBMutation(undefined);
  const [updateUserDetailsInDB] = useUpdateUserDetailsInDBMutation(undefined);
  const {
    data: { data: [userData] } = { data: [] },
    isError,
    isLoading: isUserDetailsLoading,
  } = useGetUserDetailsByEmailQuery(email as string) || [];

  const { id, photoURL: dbPhotoURL, phoneNumber, address } = userData || {};

  const dispatch = useAppDispatch();

  let defaultValues;
  if (user) {
    defaultValues = {
      name: user?.displayName || "",
      email: user?.email || "",
      phoneNumber: phoneNumber || null,
      address: address?.addressLineOne || "",
    };
  }

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    console.log("Clicked Ok button");

    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleSwitchChange = (checked: any) => {
    setSwitchChecked(checked);
    if (checked) {
      showModal();
    } else {
      // do nothing
    }
  };

  // const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
  //   const fileList = e.target.files;
  //   if (fileList && fileList.length > 0) {
  //     const uploadedFile = fileList[0];
  //     setFile(uploadedFile);
  //   }
  // };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { email, name, photoURL, phoneNumber, address } = data;

      const userDetails = {
        name: name,
        email: email,
        phoneNumber: parseInt(phoneNumber) || null,
        address: {
          addressLineOne: address,
          addressLineTwo: "",
          addressLineThree: "",
        },
      };

      const userDetailId = { userDetailId: id };

      const formData = new FormData();

      file && formData.append("file", file);
      formData.append("data", JSON.stringify(userDetailId));

      formData && (await dispatch(fileUploadsApi.endpoints.insertFileUploadsIntoDB.initiate(formData)));

      // update firebase authenticated current user and also db
      await updateProfile(auth.currentUser as User, {
        displayName: name,
        photoURL: "https://res.cloudinary.com/dsp6g0ykp/image/upload/v1705481608/lyzwy4sajihesxzcsnjv.png",
      })
        .then(() => {
          // add or update details into database
          if (!isUserDetailsLoading && userData) {
            updateUserDetailsInDB({ id, data: userDetails });
          } else {
            insertUserDetailsIntoDB(userDetails);
          }

          toast.success("Profile updated!");
        })
        .catch((error) => {
          // do nothing
        });
    } catch (err) {
      // do nothing
    }
  };

  return (
    <>
      <Switch
        onClick={handleSwitchChange}
        checked={switchChecked}
        checkedChildren="Update Profile"
        unCheckedChildren="Update Profile"
        className={switchChecked ? "" : "bg-secondary"}
      />

      <Modal title="Update Profile" open={open} onCancel={() => setOpen(false)} footer={null}>
        <Form defaultValues={defaultValues} submitHandler={onSubmit}>
          <div>
            <InputField name="name" type="text" size="large" label="User Name" />
          </div>
          <div
            style={{
              margin: "15px 0px",
            }}
          >
            <InputField name="phoneNumber" type="number" size="large" label="User Phone Number" />
          </div>
          <div
            style={{
              margin: "15px 0px",
            }}
          >
            <InputField name="address" type="text" size="large" label="User Address" />
          </div>
          <div
            style={{
              margin: "15px 0px",
            }}
          >
            {/* <input type="file" onChange={uploadImage} placeholder="Profile Picture" /> */}
          </div>

          <UploadField setFile={setFile} />

          <Button
            // disabled={isLoading}
            className="bg-gradient-to-l hover:bg-gradient-to-b from-primary/90 to-primary/70 hover:text-slate-900 ml-auto mt-6 flex"
            type="primary"
            htmlType="submit"
            loading={confirmLoading}
            onClick={handleOk}
          >
            Update
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdateProfile;
