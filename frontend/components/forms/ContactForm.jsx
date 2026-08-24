"use client";

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  contactFormSchema } from

"@/lib/validations";
import { MagneticButton } from "@/components/common/MagneticButton";
import { cn } from "@/lib/utils";

const projectTypes = [
"Residential",
"Commercial",
"Mixed Use",
"Interior",
"Investment",
"Other"];


const budgetRanges = [
"Under $250k",
"$250k – $1M",
"$1M – $5M",
"$5M – $15M",
"$15M+",
"Not sure yet"];




export function ContactForm({ className }) {
  const [submitState, setSubmitState] = useState("idle");
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      projectType: undefined,
      budget: undefined,
      preferredLocation: "",
      message: "",
      consent: false
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState("loading");
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setSubmitState("success");
      reset();
    } catch (error) {
      setSubmitState("error");
      setServerError(
        error instanceof Error ?
        error.message :
        "Something went wrong. Please try again."
      );
    }
  });

  const fieldClass =
  "w-full border border-current/15 bg-transparent px-4 py-3 outline-none transition-colors focus:border-brick";

  return (/*#__PURE__*/
    _jsxs("form", {
      onSubmit: onSubmit,
      className: cn("space-y-6", className),
      noValidate: true,
      "aria-busy": submitState === "loading", children: [/*#__PURE__*/

      _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [/*#__PURE__*/
        _jsx(Field, { label: "Full name", htmlFor: "fullName", error: errors.fullName?.message, children: /*#__PURE__*/
          _jsx("input", {
            id: "fullName",
            type: "text",
            autoComplete: "name",
            className: fieldClass,
            "aria-invalid": Boolean(errors.fullName), ...
            register("fullName") }
          ) }
        ), /*#__PURE__*/

        _jsx(Field, { label: "Email", htmlFor: "email", error: errors.email?.message, children: /*#__PURE__*/
          _jsx("input", {
            id: "email",
            type: "email",
            autoComplete: "email",
            className: fieldClass,
            "aria-invalid": Boolean(errors.email), ...
            register("email") }
          ) }
        ), /*#__PURE__*/

        _jsx(Field, { label: "Phone", htmlFor: "phone", error: errors.phone?.message, children: /*#__PURE__*/
          _jsx("input", {
            id: "phone",
            type: "tel",
            autoComplete: "tel",
            className: fieldClass,
            "aria-invalid": Boolean(errors.phone), ...
            register("phone") }
          ) }
        ), /*#__PURE__*/

        _jsx(Field, {
          label: "Company (optional)",
          htmlFor: "company",
          error: errors.company?.message, children: /*#__PURE__*/

          _jsx("input", {
            id: "company",
            type: "text",
            autoComplete: "organization",
            className: fieldClass,
            "aria-invalid": Boolean(errors.company), ...
            register("company") }
          ) }
        )] }
      ), /*#__PURE__*/

      _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [/*#__PURE__*/
        _jsx(Field, {
          label: "Project type",
          htmlFor: "projectType",
          error: errors.projectType?.message, children: /*#__PURE__*/

          _jsxs("select", {
            id: "projectType",
            className: cn(fieldClass, "normal-case tracking-normal"),
            "aria-invalid": Boolean(errors.projectType),
            defaultValue: "", ...
            register("projectType"), children: [/*#__PURE__*/

            _jsx("option", { value: "", disabled: true, children: "Select type" }

            ),
            projectTypes.map((type) => /*#__PURE__*/
            _jsx("option", { value: type, children:
              type }, type
            )
            )] }
          ) }
        ), /*#__PURE__*/

        _jsx(Field, { label: "Budget range", htmlFor: "budget", error: errors.budget?.message, children: /*#__PURE__*/
          _jsxs("select", {
            id: "budget",
            className: cn(fieldClass, "normal-case tracking-normal"),
            "aria-invalid": Boolean(errors.budget),
            defaultValue: "", ...
            register("budget"), children: [/*#__PURE__*/

            _jsx("option", { value: "", disabled: true, children: "Select budget" }

            ),
            budgetRanges.map((range) => /*#__PURE__*/
            _jsx("option", { value: range, children:
              range }, range
            )
            )] }
          ) }
        )] }
      ), /*#__PURE__*/

      _jsx(Field, {
        label: "Preferred location",
        htmlFor: "preferredLocation",
        error: errors.preferredLocation?.message, children: /*#__PURE__*/

        _jsx("input", {
          id: "preferredLocation",
          type: "text",
          className: fieldClass,
          "aria-invalid": Boolean(errors.preferredLocation), ...
          register("preferredLocation") }
        ) }
      ), /*#__PURE__*/

      _jsx(Field, { label: "Message", htmlFor: "message", error: errors.message?.message, children: /*#__PURE__*/
        _jsx("textarea", {
          id: "message",
          rows: 6,
          className: cn(fieldClass, "resize-y min-h-[9rem]"),
          "aria-invalid": Boolean(errors.message), ...
          register("message") }
        ) }
      ), /*#__PURE__*/

      _jsxs("div", { children: [/*#__PURE__*/
        _jsxs("label", { className: "flex items-start gap-3 text-sm", children: [/*#__PURE__*/
          _jsx("input", {
            type: "checkbox",
            className: "mt-1 h-4 w-4 accent-brick",
            "aria-invalid": Boolean(errors.consent), ...
            register("consent") }
          ), /*#__PURE__*/
          _jsxs("span", { children: ["I consent to Builder Bricks storing and processing my details to respond to this inquiry. See our",

            " ", /*#__PURE__*/
            _jsx(Link, { href: "/privacy", className: "underline hover:text-brick", children: "privacy policy" }

            ), "."] }

          )] }
        ),
        errors.consent ? /*#__PURE__*/
        _jsx("p", { className: "mt-2 text-sm text-brick", role: "alert", children:
          errors.consent.message }
        ) :
        null] }
      ), /*#__PURE__*/

      _jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [/*#__PURE__*/
        _jsx(MagneticButton, {
          type: "submit",
          disabled: submitState === "loading",
          className: "min-w-[10rem]", children:

          submitState === "loading" ? /*#__PURE__*/
          _jsxs(_Fragment, { children: [/*#__PURE__*/
            _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin", "aria-hidden": true }), "Sending…"] }

          ) :

          "Send inquiry" }

        ),

        submitState === "success" ? /*#__PURE__*/
        _jsx("p", { className: "text-sm text-sage", role: "status", children: "Thank you — your message has been received. We will respond shortly." }

        ) :
        null,

        submitState === "error" && serverError ? /*#__PURE__*/
        _jsx("p", { className: "text-sm text-brick", role: "alert", children:
          serverError }
        ) :
        null] }
      )] }
    ));

}

function Field({
  label,
  htmlFor,
  error,
  children





}) {
  return (/*#__PURE__*/
    _jsxs("div", { children: [/*#__PURE__*/
      _jsx("label", { htmlFor: htmlFor, className: "label-caps mb-2 block", children:
        label }
      ),
      children,
      error ? /*#__PURE__*/
      _jsx("p", { className: "mt-2 text-sm text-brick", role: "alert", children:
        error }
      ) :
      null] }
    ));

}