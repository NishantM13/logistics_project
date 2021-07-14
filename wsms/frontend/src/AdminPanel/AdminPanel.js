import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Schema from "./schema";
import "../styles.css";

export default function AdminPanel() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const onSubmit = (data) => {
    fetch(`http://localhost:8000/${data.type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
    });
  };

  const isType = watch("type");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("type")}>
        <option value="vendor">Vendor</option>
        <option value="consignee">Consignee</option>
        <option value="warehouse">Warehouse</option>
      </select>

      <input placeholder="Name" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <input placeholder="Address" {...register("address")} />
      {errors.address && <p>{errors.address.message}</p>}

      <input placeholder="Email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input placeholder="Contact" {...register("contact")} />
      {errors.contact && <p>{errors.contact.message}</p>}

      {isType === "warehouse" && (
        <div>
          <input
            placeholder="warehouseField1"
            {...register("warehouseField1")}
          />
        </div>
      )}

      <input type="submit" />
    </form>
  );
}
