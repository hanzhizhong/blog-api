'use strict';
const md5=require('md5')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('users', [{
        username: 'zhangsan',
        passwd: md5('12345')
      },
      {
        username: 'zhangsan2',
        passwd: md5('12345')
      },
      {
        username: 'zhangsan3',
        passwd: md5('12345'),
        gender: "female"
      },
      {
        username: 'zhangsan4',
        passwd: md5('12345'),
        gender: "male"
      },
      {
        username: "李廷竹",
        passwd: md5('12345'),
        nickname: "操江提督",
        gender: "female",
        birthday: new Date(1988, 2, 21)
      }
    ])
    await queryInterface.bulkInsert('blogs', [{
        title: "老猿学5G扫盲贴：N6接口用户平面协议栈对应的网络分层模型",
        user_id: 1
      },
      {
        title: "HTTP与HTTPS的区别",
        content: `安全性上，HTTPS是安全超文本协议，在HTTP基础上有更强的安全性。简单来说，HTTPS是使用TLS/SSL加密的HTTP协议

    申请证书上，HTTPS需要使用ca申请证书
    
    传输协议上, HTTP是超文本传输协议，明文传输；HTTPS是具有安全性的 SSL 加密传输协议
    
    连接方式与端口上，http的连接简单，是无状态的，端口是 80； https 在http的基础上使用了ssl协议进行加密传输，端口是 443
    `,
        user_id: 2
      },
      {
        title: "新基建新动力已来，RPA 成为数字化转型新利器！",
        user_id: 1,
        content: `被首次写进政府工作报告的“新基建”，无疑成为了当下最强劲的产业风口之一。随着云计算、人工智能、5G、物联网等数字化技术不断赋能产业转型，人们对数字基础设施的需求更加迫切，“新基建”的提出成为破局数字化发展的重要标志。

    对于企业而言，“新基建”绝对不是简单的降本增效，而是要以新发展理念为引领，以技术创新为驱动，以信息网络为基础，释放产业价值。在疫情 “新常态”下，如何通过技术创新实现从操作流程到管理流程的跃迁，让各行业企业及员工享受到数字化转型带来的红利将成为发展当下的新课题。
    `
      },
    ])

    await queryInterface.bulkInsert('likes',[
      {blog_id:1,user_id:1},
      {blog_id:1,user_id:2},
      {blog_id:2,user_id:3},
      {blog_id:3,user_id:3},
      {blog_id:1,user_id:4},
      {blog_id:3,user_id:2},
      {blog_id:1,user_id:2}
    ])
    await queryInterface.bulkInsert('replies',[
      {blog_id:1,user_id:1,content:"毫无新意的评论1"},
      {blog_id:1,user_id:2,content:"毫无新意的评论2"},
      {blog_id:1,user_id:4,content:"毫无新意的评论3"},
      {blog_id:1,user_id:5,content:"毫无新意的评论4"},
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('users',null,{});
    await queryInterface.bulkDelete('blogs',null,{});
    await queryInterface.bulkDelete('likes',null,{});
    await queryInterface.bulkDelete('replies',null,{});
  }
};