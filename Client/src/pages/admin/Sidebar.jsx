import { Link, Outlet, useLocation } from "react-router-dom";
import { AiFillFileText } from "react-icons/ai";
import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { MdEmojiEvents } from "react-icons/md";
import {
  RiDashboardFill,
  RiShoppingBag3Fill,
  RiCoupon2Fill,
} from "react-icons/ri";
import { IoPeopleSharp } from "react-icons/io5";
import {
  FaRegChartBar,
  FaChartPie,
  FaChartLine,
  FaStopwatch,
  FaBitcoin,
} from "react-icons/fa";
import { User } from "lucide-react";

function AdminSideBar() {
  const location = useLocation();

  return (
    <div className="w-full ">
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white shadow-lg flex flex-col px-6 py-4">
      {/* Logo */}
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Logo</h2>

      {/* Sections */}
      <SideBarSection
        title="Dashboard"
        items={[
          { text: "Dashboard", url: "/admin/dashboard", Icon: RiDashboardFill },
          { text: "Teachers", url: "/admin/dashboard/teachers", Icon: GiTeacher  },
          { text: "Students", url: "/admin/dashboard/students", Icon: PiStudentBold  },
          { text: "Events", url: "/admin/dashboard/events", Icon: MdEmojiEvents  },
        ]}
        pathname={location.pathname}
      />

      <SideBarSection
        title="Courses"
        items={[
          { text: "Courses Create", url: "/admin/dashboard/createCourse", Icon: User },
          { text: "Courses Table", url: "/admin/dashboard/courses", Icon: FaChartPie },
        ]}
        pathname={location.pathname}
      />

      <SideBarSection
        title="Apps"
        items={[
          { text: "Stopwatch", url: "/admin/apps/stopwatch", Icon: FaStopwatch },
          { text: "Toss", url: "/admin/app/toss", Icon: FaBitcoin },
          { text: "Coupon", url: "/admin/app/coupon", Icon: RiCoupon2Fill },
        ]}
        pathname={location.pathname}
      />
    </aside>
    <h1>hi</h1>
    <Outlet/>
    </div>
  );
}

const SideBarSection = ({ title, items, pathname }) => (
  <div className="mb-6">
    <h5 className="text-gray-500 uppercase text-xs font-semibold mb-3">
      {title}
    </h5>
    <ul className="flex flex-col gap-2">
      {items.map(({ text, url, Icon }) => (
        <SidebarItem
          key={url}
          text={text}
          url={url}
          Icon={Icon}
          active={pathname === url}
        />
      ))}
    </ul>
  </div>
);

const SidebarItem = ({ text, url, Icon, active }) => {
  return (
    <li>
      <Link
        to={url}
        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          active
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
        }`}
      >
        <Icon className={`text-lg ${active ? "text-blue-600" : ""}`} />
        {text}
      </Link>
    </li>
  );
};

export default AdminSideBar;
