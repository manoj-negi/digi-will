import { getInitPage } from '@keystone-6/auth/pages/InitPage';

const fieldPaths = ["name","email","isAdmin","password"];

export default getInitPage({"listKey":"User","fieldPaths":["name","email","isAdmin","password"],"enableWelcome":true});
