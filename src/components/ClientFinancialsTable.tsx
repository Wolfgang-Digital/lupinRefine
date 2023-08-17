import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Badge, Space, Table } from "antd";

interface DataType {
  key: React.Key;
  month: string;
  hours: string;
  rate: string;
  value: string;
  hours2: string;
  rate2: string;
  value2: string;
  budgtInv: string;
  invoiced: string;
  used: string;
  balremaing: string;
}

interface ExpandedDataType extends Omit<DataType, "month"> {
  task: string;
  staff: string;
  upgradeNum: string;
}

const App: React.FC = () => {
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Implementation- Bing", dataIndex: "task", key: "task" },
      { title: "Staff", dataIndex: "staff", key: "staff" },
      { title: "Hours", dataIndex: "hours", key: "hours" },
      { title: "Rate", dataIndex: "rate", key: "rate" },
      { title: "Value", dataIndex: "value", key: "value" },
      {
        title: "",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <Space size="middle">
            {/* The tickable box */}
            <input type="checkbox" />
          </Space>
        ),
      },
    ];

    const data: ExpandedDataType[] = [];
    for (let i = 0; i < 1; ++i) {
      data.push({
        key: i.toString(),
        task: "Reporting",
        staff: "Jack",
        upgradeNum: "Upgraded: 56",
        hours: "28",
        rate: "148",
        value: "4148",
        hours2: "21.5",
        rate2: "151",
        value2: "3248",
        budgtInv: "4448",
        invoiced: "4448",
        used: "3248",
        balremaing: "1200",
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<DataType> = [
    { title: "Month", dataIndex: "month", key: "month" },
    { title: "Hours", dataIndex: "hours", key: "hours" },
    { title: "Rate", dataIndex: "rate", key: "rate" },
    { title: "Value", dataIndex: "value", key: "value" },
    { title: "Hours", dataIndex: "hours2", key: "hours2" },
    { title: "Rate", dataIndex: "rate2", key: "rate2" },
    { title: "Value", dataIndex: "value2", key: "value2" },
    { title: "Bdgt to Inv", dataIndex: "budgtInv", key: "budgtInv" },
    { title: "Invoiced", dataIndex: "invoiced", key: "invoiced" },
    { title: "Used", dataIndex: "used", key: "used" },
    { title: "Bal Remain", dataIndex: "balremaing", key: "balremaing" },
    {
      title: "Balanced",
      key: "operation",
    },
  ];

  const data: DataType[] = [];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  for (let i = 0; i < 12; ++i) {
    data.push({
      key: i.toString(),
      month: months[i],
      hours: "28",
      rate: "148",
      value: "4148",
      hours2: "21.5",
      rate2: "151",
      value2: "3248",
      budgtInv: "4448",
      invoiced: "4448",
      used: "3248",
      balremaing: "1200",
    });
  }

  return (
    <>
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
        dataSource={data}
      />
    </>
  );
};

export default App;
