const MENU = [
  {
    title: '账号管理',
    icon: 'user',
    key: 'accountManager',
    auth: 'workplace/accountManager',
    children: [
      {
        title: '自媒体账号',
        key: 'weMediaAccount',
        auth: 'workplace/accountManager/weMediaAccount',
        router: 'workplace/accountManager/weMediaAccount'
      }
    ]
  },
  {
    title: 'subnav 1',
    icon: 'laptop',
    key: 'sub1',
    auth: 'sub1',
    children: [
      {
        title: 'option1',
        key: 'option1',
        auth: 'option1'
      },
      {
        title: 'option2',
        key: 'option2',
        auth: 'option2'
      },
      {
        title: 'option3',
        key: 'option3',
        auth: 'option3'
      },
      {
        title: 'option4',
        key: 'option4',
        auth: 'option4'
      }
    ]
  },
  {
    title: 'subnav 2',
    icon: 'notification',
    key: 'sub2',
    auth: 'sub2',
    children: [
      {
        title: 'option5',
        key: 'option5',
        auth: 'option5'
      },
      {
        title: 'option6',
        key: 'option6',
        auth: 'option6'
      },
      {
        title: 'option7',
        key: 'option7',
        auth: 'option7'
      },
      {
        title: 'option8',
        key: 'option8',
        auth: 'option8'
      }
    ]
  }
];

export default MENU;
