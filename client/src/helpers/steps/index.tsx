import Info from "../../pages/Adlib/Info";
import List from "../../pages/Adlib/List";
import Verify from "../../pages/Adlib/Verify";

const steps = [
    {
      title: 'Setup',
      content: <Info/>,
    },
    {
      title: 'Templates',
      content: <List/>,
    },
    {
      title: 'Validate',
      content: <Verify/>,
    },
];

export { steps };