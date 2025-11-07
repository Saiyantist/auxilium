// import { Calendar, Home, Inbox, Search, Settings, Dumbbell, User, Phone, Briefcase } from "lucide-react"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import { Link } from "react-router-dom" // or next/link if using Next.js

// // Menu items for your fitness app
// const items = [
//   {
//     title: "Dashboard",
//     url: "/dashboard",
//     icon: Home,
//   },
//   {
//     title: "Workouts",
//     url: "/dashboard/workouts",
//     icon: Dumbbell,
//   },
//   {
//     title: "Profile",
//     url: "/profile",
//     icon: User,
//   },
//   {
//     title: "About",
//     url: "/about",
//     icon: Inbox,
//   },
//   {
//     title: "Services",
//     url: "/services",
//     icon: Briefcase,
//   },
//   {
//     title: "Contact",
//     url: "/contact",
//     icon: Phone,
//   },
//   {
//     title: "Settings",
//     url: "/settings",
//     icon: Settings,
//   },
// ]

// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Fitness App</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <Link to={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   )
// }