
import { FaSearch, FaBell } from "react-icons/fa";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";
import { BiMaleFemale } from "react-icons/bi";
import BarChart, { Doughnuts } from "./barchart";

const Dashboard = () => {
  return (
    <>
      
      <main className="flex flex-col w-[86%] h-full p-4 ml-[18rem]">
        {/* Header */}
        <div className="w-full h-[60px] p-4">
          <div className="flex flex-row gap-2 items-center justify-between shadow-md px-4 py-2 rounded-md">
            {/* Search */}
            <div className="flex flex-row gap-2 items-center w-[90%] p-2">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 rounded-md bg-gray-100 text-sm outline-none"
              />
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3 text-lg">
              <FaBell className="cursor-pointer" />
              <p className="font-medium">Admin</p>
            </div>
          </div>
        </div>

        {/* Widgets */}
        <div className="flex w-full flex-row gap-6 items-center justify-between mt-10">
          <SmallContainerBox
            heading="Revenue"
            amount="$2,125,430"
            percentage="90"
            color="blue"
          />
          <SmallContainerBox
            heading="Teachers"
            amount="1000"
            percentage="60"
            color="aqua"
          />
          <SmallContainerBox
            heading="Students"
            amount="23000"
            percentage="-17.4"
            color="yellow"
          />
          <SmallContainerBox
            heading="Events"
            amount="1000"
            percentage="42"
            color="YellowGreen"
          />
        </div>

        {/* Revenue & Inventory */}
        <div className="flex flex-row gap-10 justify-between p-8 w-full">
          {/* Revenue */}
          <div className="bg-white w-[70%] p-6 rounded-xl shadow">
            <h5 className="text-2xl tracking-wide font-medium text-center mb-4">
              Revenue & Transactions
            </h5>
            <BarChart
              data_1={[200, 400, 500, 100, 244, 677, 233, 153, 222, 336]}
              data_2={[111, 222, 333, 444, 555, 666, 777, 888, 999, 555]}
              color_1="rgba(0,88,255,0.6)"
              color_2="rgba(63, 212, 108, 0.6)"
              title_1="Revenue"
              title_2="Transaction"
            />
          </div>

        </div>

        {/* Transactions & Gender */}
        <div className="flex flex-row gap-6 justify-between p-5 w-full">
          {/* Gender */}
          <div className="relative w-[30%] bg-white shadow-md p-5 rounded-xl">
            <h5 className="text-lg font-medium tracking-wide text-center mb-4">
              Gender Ratio
            </h5>
            <p className="absolute text-2xl text-gray-500 inset-0 flex items-center justify-center">
              <BiMaleFemale />
            </p>
            <Doughnuts
              title="Gender ratio"
              data={[10, 20]}
              labels={["Male", "Female"]}
              backgroundColor={[
                "rgba(0,88,255,0.6)",
                "rgba(63, 212, 108, 0.6)",
              ]}
              cutout={"120"}
            />
          </div>

          {/* Top Transactions */}
          <div className="flex flex-col gap-6 items-center w-[70%] bg-white shadow-md p-5 rounded-xl">
            <h5 className="text-lg font-medium tracking-wide text-center">
              Top Transactions
            </h5>
          </div>
        </div>
      </main>
    </>
  );
};



const InventoryBars = ({ text, value }) => {
  return (
    <div className="flex flex-row gap-2 items-center justify-between w-full">
      <p className="font-medium">{text}</p>
      <div className="w-[100px] h-[7px] bg-gray-200 rounded-full">
        <div
          className="h-[7px] rounded-full"
          style={{
            width: `${value}%`,
            backgroundColor: `hsl(${Number(value) * 3}, ${value}%, 50%)`,
          }}
        />
      </div>
      <div className="text-sm font-semibold">{value}%</div>
    </div>
  );
};

const SmallContainerBox = ({ heading, amount, percentage, color }) => {
  const isPositive = Number(percentage) > 0;

  return (
    <div className="relative w-[320px] bg-white shadow-md p-5 rounded-2xl flex flex-row gap-4 items-center justify-between">
      {/* Left */}
      <div className="flex flex-col gap-1 items-start justify-between">
        <h3 className="text-sm font-semibold text-gray-400 tracking-wide">
          {heading}
        </h3>
        <p className="text-2xl font-bold text-black">{amount}</p>

        <div className="flex flex-row gap-2 items-center">
          {isPositive ? (
            <>
              <IoMdTrendingUp className="text-green-500 text-xl" />
              <span className="text-green-500 font-bold">
                +{percentage}%
              </span>
            </>
          ) : (
            <>
              <IoMdTrendingDown className="text-red-500 text-xl" />
              <span className="text-red-500 font-bold">{percentage}%</span>
            </>
          )}
        </div>
      </div>

      {/* Right (circular progress) */}
      <div
        className="relative rounded-full grid place-items-center"
        style={{
          background: `conic-gradient(${color} ${
            Math.abs(Number(percentage) % 100) * 3.6
          }deg, #fff 0)`,
          width: "100px",
          height: "100px",
        }}
      >
        <span className="absolute flex items-center justify-center bg-white rounded-full w-[75px] h-[75px] font-bold text-blue-500">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
