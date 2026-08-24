"use client";

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

















const quickFilters = [
"All",
"Residential",
"Commercial",
"Mixed Use",
"Completed",
"Under Development"];


export function ProjectFilters({
  value,
  onChange,
  cities,
  showStatus = true,
  showCity = true,
  className
}) {
  return (/*#__PURE__*/
    _jsxs("div", { className: cn("space-y-5", className), children: [/*#__PURE__*/
      _jsx("div", { className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between", children: /*#__PURE__*/
        _jsxs("label", { className: "relative block w-full max-w-md", children: [/*#__PURE__*/
          _jsx("span", { className: "sr-only", children: "Search projects" }), /*#__PURE__*/
          _jsx("input", {
            type: "search",
            value: value.query,
            onChange: (event) =>
            onChange({ ...value, query: event.target.value }),

            placeholder: "Search by name or city",
            className: "w-full border border-current/15 bg-transparent px-4 py-3 outline-none focus:border-brick" }
          )] }
        ) }
      ), /*#__PURE__*/

      _jsx("div", { className: "no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1", children:
        quickFilters.map((filter) => {
          const active =
          filter === "All" ?
          value.category === "All" && value.status === "All" :
          filter === "Completed" || filter === "Under Development" ?
          value.status === filter :
          value.category === filter;

          return (/*#__PURE__*/
            _jsx("button", {

              type: "button",
              className: cn(
                "label-caps shrink-0 touch-target border px-4 py-2 transition-colors",
                active ?
                "border-brick bg-brick text-muted-white" :
                "border-current/20 hover:border-brick"
              ),
              onClick: () => {
                if (filter === "All") {
                  onChange({ ...value, category: "All", status: "All" });
                } else if (
                filter === "Completed" ||
                filter === "Under Development")
                {
                  onChange({
                    ...value,
                    status: value.status === filter ? "All" : filter,
                    category: "All"
                  });
                } else {
                  onChange({
                    ...value,
                    category: value.category === filter ? "All" : filter,
                    status: "All"
                  });
                }
              }, children:

              filter }, filter
            ));

        }) }
      ),

      (showStatus || showCity) && /*#__PURE__*/
      _jsxs("div", { className: "flex flex-wrap gap-3", children: [
        showStatus ? /*#__PURE__*/
        _jsxs("label", { className: "label-caps flex items-center gap-2", children: ["Status", /*#__PURE__*/

          _jsxs("select", {
            className: "border border-current/20 bg-transparent px-3 py-2 text-sm normal-case tracking-normal",
            value: value.status,
            onChange: (event) =>
            onChange({
              ...value,
              status: event.target.value
            }), children: [/*#__PURE__*/


            _jsx("option", { value: "All", children: "All" }), /*#__PURE__*/
            _jsx("option", { value: "Completed", children: "Completed" }), /*#__PURE__*/
            _jsx("option", { value: "Under Development", children: "Under Development" }), /*#__PURE__*/
            _jsx("option", { value: "Planning", children: "Planning" })] }
          )] }
        ) :
        null,
        showCity ? /*#__PURE__*/
        _jsxs("label", { className: "label-caps flex items-center gap-2", children: ["City", /*#__PURE__*/

          _jsxs("select", {
            className: "border border-current/20 bg-transparent px-3 py-2 text-sm normal-case tracking-normal",
            value: value.city,
            onChange: (event) =>
            onChange({ ...value, city: event.target.value }), children: [/*#__PURE__*/


            _jsx("option", { value: "All", children: "All" }),
            cities.map((city) => /*#__PURE__*/
            _jsx("option", { value: city, children:
              city }, city
            )
            )] }
          )] }
        ) :
        null] }
      )] }

    ));

}

export function filterProjects(
projects,
state)
{
  const query = state.query.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesQuery =
    !query ||
    project.title.toLowerCase().includes(query) ||
    project.city.toLowerCase().includes(query) ||
    project.category.toLowerCase().includes(query);
    const matchesCategory =
    state.category === "All" || project.category === state.category;
    const matchesStatus =
    state.status === "All" || project.status === state.status;
    const matchesCity = state.city === "All" || project.city === state.city;
    return matchesQuery && matchesCategory && matchesStatus && matchesCity;
  });
}

export function useDefaultFilterState(
searchParams)
{
  return useMemo(() => {
    const get = (key) => searchParams?.get(key) ?? null;
    return {
      query: get("q") ?? "",
      category: get("category") || "All",
      status: get("status") || "All",
      city: get("city") || "All"
    };
  }, [searchParams]);
}