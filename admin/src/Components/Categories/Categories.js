import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { CategoryManagement, SubCategoryManagement, TypeManagement } from "./";

function TabPanel(props) {
     const { children, value, index, ...other } = props;

     return (
          <div
               role="tabpanel"
               hidden={value !== index}
               id={`simple-tabpanel-${index}`}
               aria-labelledby={`simple-tab-${index}`}
               {...other}
          >
               {value === index && (
                    <Box sx={{ p: 3 }}>
                         <>{children}</>
                    </Box>
               )}
          </div>
     );
}

TabPanel.propTypes = {
     children: PropTypes.node,
     index: PropTypes.number.isRequired,
     value: PropTypes.number.isRequired,
};

function a11yProps(index) {
     return {
          id: `simple-tab-${index}`,
          "aria-controls": `simple-tabpanel-${index}`,
     };
}

const Categories = () => {
     const [value, setValue] = React.useState(0);

     const handleChange = (event, newValue) => {
          setValue(newValue);
     };

     return (
          <Box sx={{ width: "100%" }}>
               <Box sx={{ borderBottom: 1, borderColor: "divider", backgroundColor: "#ffffff" }}>
                    <Tabs
                         value={value}
                         onChange={handleChange}
                         aria-label="basic tabs example"
                         centered
                         textColor="secondary"
                         indicatorColor="secondary"
                    >
                         <Tab label="Category" {...a11yProps(0)} />
                         <Tab label="SubCategory" {...a11yProps(1)} />
                         <Tab label="Type" {...a11yProps(2)} />
                    </Tabs>
               </Box>
               <TabPanel value={value} index={0}>
                    <CategoryManagement />
               </TabPanel>
               <TabPanel value={value} index={1}>
                    <SubCategoryManagement />
               </TabPanel>
               <TabPanel value={value} index={2}>
                    <TypeManagement />
               </TabPanel>
          </Box>
     );
};

export default Categories;
