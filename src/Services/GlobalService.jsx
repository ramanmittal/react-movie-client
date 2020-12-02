import { getRoles } from "@testing-library/react"

const globalObject = {}
const menus = [
    { text: "Users", To: "/users", Roles: ["Admin"] },
    { text: "Create User", To: "/createuser", Roles: ["Admin"] },
    { text: "Movies", To: "/movies", Roles: ["User"] },
    { text: "Create Movie", To: "/createmovies", Roles: ["User"] }
]

export const getRoleMenus = (roles) => {
    return menus.filter(menu => roles.filter(value => menu.Roles.includes(value)).length > 0)
}
export { menus }
export default globalObject

