import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function UserProfileUpdate({ userId, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/loginById/${userId}`
        );
        reset(res.data.user);
      } catch (error) {
        toast.error("Failed to load user data");
      }
    };

    fetchUserData();
  }, [userId, reset]);

  const onSubmit = async (formData) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/updateProfile/${userId}`,
        formData
      );
      toast.success("Profile updated successfully!");
      if (onClose) onClose();
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };
  

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("name", { required: "Name is required" })}
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}

        <Input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <Input
          type="text"
          {...register("phone", { required: "Phone is required" })}
          placeholder="Enter your phone"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}

        <Input
          type="text"
          {...register("address", { required: "Address is required" })}
          placeholder="Enter your address"
        />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}

        <div className="flex justify-end">
          <Button type="submit" className="bg-primary text-white">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
