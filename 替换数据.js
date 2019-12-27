

achievement

{ key: "achievement_code", label: "成就编号" },
{ key: "name", label: "成就或者活动名称" },
{ key: "bonus_points", label: "成就奖励积分" },
{ key: "url", label: "成就图片url" },
{ key: "type", label: "成就类型1.成就 2.周活动 3.月活动 4.等等" },
{ key: "state", label: "1.等待开启   2.进行中  3.已过期 " },
{ key: "num", label: "" },
{ key: "begin_time", label: "成就或活动开始时间" },
{ key: "end_time", label: "成就或活动结束时间" },
{ key: "creat_time", label: "成就或活动创建时间" },
{ key: "create_by", label: "创建者" },
{ key: "_sum", label: "获取成就最低完成任务数量 0无限制" },
{ key: "goal_sum", label: "获取成就最低得分数量 0无限制" },
{ key: "completion_rate", label: "任务完成率要求  0无限制" },
{ key: "lable", label: "成就标签" },
{ key: "introduce", label: "成就或活动介绍" },





answers


{ key: "answers_code", label: "回答编号" },
{ key: "_code", label: "" },
{ key: "user_code", label: "" },
{ key: "question_code", label: "所属问题编号" },
{ key: "create_by", label: "创建者 customer_code user_code" },
{ key: "create_time", label: "创建时间" },
{ key: "answers", label: "答案" },
{ key: "status", label: "问卷选项状态0未审核 1审核中 2已审核" },
{ key: "goals", label: "得分 如果没有特殊标准分数&gt;=60合格" },





business

{ key: "user_code", label: "" },
{ key: "business_name", label: "总商名称" },
{ key: "logo", label: "总商logo url" },
{ key: "total_project_num", label: "总工程数" },
{ key: "publish_project_num", label: "进行中的工程数" },
{ key: "finish_project_num", label: "已完结的工程数" },





business_package

{ key: "package_code", label: "套餐编号" },
{ key: "title", label: "套餐标题" },
{ key: "name", label: "套餐名称" },
{ key: "state", label: "套餐状态 1.等待上架 2.上架  3.下架 " },
{ key: "sum", label: "套餐总数量" },
{ key: "num", label: "套餐剩余数量" },
{ key: "type", label: "套餐类型 1.优惠券 2.实物商品 " },
{ key: "monthly_execution_times", label: "每月执行次数" },
{ key: "total_months", label: "" },
{ key: "price", label: "套餐单价" },
{ key: "introduce", label: "商品介绍" },
{ key: "select_question_num", label: "" },
{ key: "picture_question_num", label: "" },
{ key: "url", label: "套餐图片url" },
{ key: "end_time", label: "套餐使用截止日期" },
{ key: "create_time", label: "套餐创建时间" },
{ key: "extend_s1", label: "" },
{ key: "extend_i1", label: "" },
{ key: "extend_f1", label: "" },
{ key: "extend_d1", label: "" },





customer


{ key: "user_code", label: "用户编码" },
{ key: "max_s_daily", label: "每天接受任务数量上限" },
{ key: "now_s_num", label: "当日已接受任务数量" },
{ key: "sum_s", label: "完成任务总数" },
{ key: "uncomplete_s_num", label: "未完成任务数量" },
{ key: "max_points_daily", label: "当日获取积分上限" },
{ key: "now_points", label: "单日目前已获取积分量" },
{ key: "sum_points", label: "积分总量" },
{ key: "max_consume_points_daily", label: "单日积分消耗上限" },
{ key: "now_consume_points", label: "当日已消费积分" },
{ key: "complete_rate", label: "任务完成率 默认1.0 任务完成总数大于20" },
{ key: "Inviter_code", label: "邀请者的标识码" },





goods


{ key: "good_code", label: "商品编号" },
{ key: "title", label: "商品标题" },
{ key: "name", label: "" },
{ key: "key_code", label: "商品对应的key的id每个商品对应很多key" },
{ key: "state", label: "商品状态 1.等待上架 2.上架  3.下架 " },
{ key: "create_time", label: "商品创建时间" },
{ key: "end_time", label: "商品使用截止日期" },
{ key: "sum", label: "" },
{ key: "num", label: "商品剩余数量" },
{ key: "type", label: "商品类型 1.优惠券 2.实物商品 " },
{ key: "points", label: "价值积分" },
{ key: "business_code", label: "总商id 提供商品的总商" },
{ key: "introduce", label: "商品介绍" },
{ key: "url", label: "商品url" },
{ key: "extend_s1", label: "" },
{ key: "extend_i1", label: "" },
{ key: "extend_f1", label: "" },
{ key: "extend_d1", label: "" },
{ key: "id", label: "" },
{ key: "name", label: "" },
{ key: "epc", label: "" },
{ key: "layer", label: "" },
{ key: "position", label: "" },
{ key: "owner", label: "" },
{ key: "note", label: "" },
{ key: "update_datetime", label: "" },
{ key: "dev_id", label: "" },
{ key: "test_id", label: "" },






goods_key









{ key: "key_code", label: "key编号" },
{ key: "key_value", label: "key值" },
{ key: "goods_code", label: "所属商品编号" },
{ key: "state", label: "0未使用 1已使用 2已过期" },
{ key: "create_time", label: "key创建时间" },
{ key: "end_time", label: "key过期时间" },
{ key: "type", label: "默认值 1" },
















{ key: "missions_code", label: "" },
{ key: "missions_name", label: "" },
{ key: "project_code", label: "所属项目编号" },
{ key: "shop_code", label: "对应商铺编号" },
{ key: "missions_status", label: "任务状态 0未开启 1开启且未提交完成 2提交完毕等待审核 3审核结束" },
{ key: "max_num", label: "单任务允许最大参与人数" },
{ key: "now_accept", label: "开始任务人数" },
{ key: "now_completed_num", label: "完成数量" },
{ key: "now_examed_num", label: "审核完毕的数量" },







msg_push









{ key: "id", label: "编号" },
{ key: "msg_type", label: "消息类型（PC APP 短信 邮件 微信）" },
{ key: "msg_title", label: "消息标题" },
{ key: "msg_content", label: "消息内容" },
{ key: "receive_code", label: "接受者账号" },
{ key: "receive_user_code", label: "接受者用户编码" },
{ key: "receive_user_name", label: "接受者用户姓名" },
{ key: "send_user_code", label: "发送者用户编码" },
{ key: "send_user_name", label: "发送者用户姓名" },
{ key: "send_date", label: "发送时间" },
{ key: "plan_push_date", label: "计划推送时间" },
{ key: "push_number", label: "推送尝试次数" },
{ key: "push_return_code", label: "推送返回结果码" },
{ key: "push_return_msg_id", label: "推送返回消息编号" },
{ key: "push_status", label: "推送状态（0未推送 1成功  2失败）" },
{ key: "push_date", label: "推送时间" },
{ key: "read_status", label: "读取状态（0未送达 1未读 2已读）" },
{ key: "read_date", label: "读取时间" },






msg_pushed









{ key: "id", label: "编号" },
{ key: "msg_type", label: "消息类型（PC APP 短信 邮件 微信）" },
{ key: "msg_title", label: "消息标题" },
{ key: "msg_content", label: "消息内容" },
{ key: "receive_code", label: "接受者账号" },
{ key: "receive_user_code", label: "接受者用户编码" },
{ key: "receive_user_name", label: "接受者用户姓名" },
{ key: "send_user_code", label: "发送者用户编码" },
{ key: "send_user_name", label: "发送者用户姓名" },
{ key: "send_date", label: "发送时间" },
{ key: "plan_push_date", label: "计划推送时间" },
{ key: "push_number", label: "推送尝试次数" },
{ key: "push_return_code", label: "推送返回结果码" },
{ key: "push_return_msg_id", label: "推送返回消息编号" },
{ key: "push_status", label: "推送状态（0未推送 1成功  2失败）" },
{ key: "push_date", label: "推送时间" },
{ key: "read_status", label: "读取状态（0未送达 1未读 2已读）" },
{ key: "read_date", label: "读取时间" },





project









{ key: "project_code", label: "" },
{ key: "create_by", label: "创建者code business_code user_code" },
{ key: "name", label: "项目名称" },
{ key: "type", label: "1.目的地问卷型  2.目的地拍摄型 3.目的地问卷拍摄型 4.非目的地问卷型" },
{ key: "status", label: "项目状态 0未开启 1开启 2结束" },
{ key: "create_time", label: "创建时间" },
{ key: "begin_time", label: "开始时间" },
{ key: "time", label: "项目持续时间  24*7&gt;t&gt;0.5" },
{ key: "introduce", label: "任务介绍" },
{ key: "claim", label: "任务要求" },
{ key: "url", label: "project 的url" },
{ key: "base_points", label: "达成任务所获取的基础积分" },
{ key: "picture_points", label: "图片奖励积分" },
{ key: "max_s_num", label: "单个工程最大任务数" },






questions









{ key: "questions_code", label: "问题编号" },
{ key: "projects_code", label: "" },
{ key: "s_code", label: "所属任务编号" },
{ key: "title", label: "题目标题" },
{ key: "questions_type", label: "题目类型 0拍照 1选择" },
{ key: "questions_options", label: "题目选项 当为拍照时为空" },
{ key: "claim", label: "题目要求" },
{ key: "questions_index", label: "题目所在问卷序号" },
{ key: "url", label: "样例url" },
{ key: "mintime", label: "回答问题的最少阅读时间默认3秒单位秒 " },







record_achievement_consumer









{ key: "record_a_c_code", label: "用户领取成就活动记录编号" },
{ key: "user_code", label: "用户编号" },
{ key: "achievement_code", label: "成就或活动编号" },
{ key: "create_time", label: "创建时间" },







record_goods_consumer









{ key: "record_g_c_code", label: "购买记录编号" },
{ key: "user_code", label: "用户编号" },
{ key: "goods_code", label: "商品编号" },
{ key: "points", label: "消耗积分" },
{ key: "num", label: "数量" },
{ key: "key_code", label: "商品key编号" },
{ key: "create_time", label: "创建时间" },
{ key: "state", label: "使用状态 1未使用 2已使用 3已过期" },





record__consumer









{ key: "record__consumer_code", label: "记录编码" },
{ key: "user_code", label: "用户编码" },
{ key: "_code", label: "任务编码" },
{ key: "now_index", label: "当前进度题目序号" },
{ key: "create_time", label: "当前记录创建时间" },
{ key: "status", label: "状态1.已接收 2.已完成 3.待审核 4.审核完毕 5.接收完毕6.放弃" },




record_packages_business









{ key: "record_pa_bu_code", label: "套餐 商家 购买记录编号" },
{ key: "user_code", label: "用户编号" },
{ key: "package_code", label: "套餐编号" },
{ key: "money", label: "订单总金额" },
{ key: "type", label: "套餐类型 默认对商家1 对用户2" },
{ key: "state", label: "使用状态 1未使用 2已使用 3已过期" },
{ key: "num", label: "购买套餐总数量" },
{ key: "total_shops_num", label: "商铺总数量" },
{ key: "monthly_execution_times", label: "每月执行次数" },
{ key: "total_months", label: "执行总月数" },
{ key: "payment_state", label: "付款状态 0已创建未付款 1已付款" },
{ key: "shop_code_arr", label: "商铺 id数组" },
{ key: "question_url", label: "添加题目url" },
{ key: "key_code", label: "商品key编号" },
{ key: "create_time", label: "创建时间" },





role









{ key: "role_code", label: "角色编码" },
{ key: "role_name", label: "角色名称" },
{ key: "role_type", label: "角色分类（1管理员、2总商、3审查员、4用户）" },
{ key: "status", label: "状态（0正常 1删除 2停用）" },
{ key: "create_by", label: "创建者" },
{ key: "create_date", label: "创建时间" },
{ key: "update_by", label: "更新者" },
{ key: "update_date", label: "更新时间" },
{ key: "remarks", label: "备注信息" },





role_scope









{ key: "role_code", label: "" },
{ key: "scope_code", label: "" },
{ key: "create_date", label: "创建日期" },





scope









{ key: "per_code", label: "" },
{ key: "per_name", label: "权限名称" },
{ key: "parent_code", label: "父级权限" },
{ key: "url", label: "权限url" },
{ key: "created_time", label: "创建时间" },
{ key: "update_time", label: "更新时间" },
{ key: "type", label: "权限类型1.api  2.chart  3.function" },
{ key: "remarks", label: "权限说明" },
{ key: "extend_s1", label: "扩展 String 1" },
{ key: "extend_s2", label: "扩展 String 2" },
{ key: "extend_i1", label: "扩展 Integer 1" },
{ key: "extend_i2", label: "扩展 Integer 2" },
{ key: "extend_f1", label: "扩展 Float 1" },
{ key: "extend_f2", label: "扩展 Float 2" },
{ key: "extend_d1", label: "扩展 Date 1" },
{ key: "extend_d2", label: "扩展 Date 2" },







shop









{ key: "shop_code", label: "商铺编码" },
{ key: "create_by", label: "" },
{ key: "create_date", label: "创建日期" },
{ key: "name", label: "商铺名称" },
{ key: "city", label: "商铺所在城市" },
{ key: "district", label: "店铺所在区县" },
{ key: "address", label: "商铺详细地址" },
{ key: "longitude", label: "经度" },
{ key: "latitude", label: "纬度" },
{ key: "remarks", label: "说明" },
{ key: "url", label: "店铺图片" },







{ key: "id", label: "" },
{ key: "user_name", label: "" },
{ key: "user_password", label: "" },
{ key: "type", label: "" },
{ key: "id", label: "" },
{ key: "name", label: "" },
{ key: "pw", label: "" },
{ key: "id", label: "用户ID" },
{ key: "email", label: "用户邮箱" },
{ key: "password", label: "用户密码" },
{ key: "username", label: "用户昵称" },
{ key: "role", label: "用户身份" },
{ key: "status", label: "用户状态" },
{ key: "regTime", label: "注册时间" },
{ key: "regIp", label: "注册IP" },
{ key: "id", label: "" },
{ key: "username", label: "" },
{ key: "date", label: "" },
{ key: "ip", label: "" },
{ key: "id", label: "" },
{ key: "user_name", label: "" },
{ key: "user_password", label: "" },
{ key: "type", label: "" },
{ key: "id", label: "" },
{ key: "name", label: "" },
{ key: "password", label: "" },
{ key: "createTime", label: "" },
{ key: "realname", label: "" },
{ key: "username", label: "" },
{ key: "password", label: "" },
{ key: "phonenum", label: "" },
{ key: "username", label: "" },
{ key: "password", label: "" },
{ key: "phonenum", label: "" },
{ key: "user_code", label: "用户编码" },
{ key: "login_code", label: "登录账号" },
{ key: "user_name", label: "用户昵称" },
{ key: "password", label: "" },
{ key: "wx_openid", label: "" },
{ key: "mgr_type", label: "管理员类型（0非管理员 1系统管理员  2总商 3任务审核人员 4普通用户）" },
{ key: "status", label: "状态（0正常 1删除 2停用 3冻结）" },
{ key: "email", label: "电子邮箱" },
{ key: "mobile", label: "手机号码" },
{ key: "sex", label: "用户性别" },
{ key: "avatar", label: "头像路径" },
{ key: "points", label: "用户积分" },
{ key: "sign", label: "个性签名.0......" },
{ key: "last_login_ip", label: "最后登陆IP" },
{ key: "last_login_date", label: "最后登陆时间" },
{ key: "freeze_cause", label: "冻结原因" },
{ key: "freeze_date", label: "冻结时间" },
{ key: "create_by", label: "创建者" },
{ key: "create_date", label: "创建时间" },
{ key: "update_by", label: "更新者" },
{ key: "update_date", label: "更新时间" },
{ key: "remarks", label: "备注信息" },
{ key: "extend_s1", label: "扩展 String 1" },
{ key: "extend_s2", label: "扩展 String 2" },
{ key: "extend_i1", label: "扩展 Integer 1" },
{ key: "extend_i2", label: "扩展 Integer 2" },
{ key: "extend_f1", label: "扩展 Float 1" },
{ key: "extend_f2", label: "扩展 Float 1" },
{ key: "extend_d1", label: "扩展 Date 1" },
{ key: "extend_d2", label: "扩展 Date 2" },
{ key: "Host", label: "" },
{ key: "User", label: "" },
{ key: "Select_priv", label: "" },
{ key: "Insert_priv", label: "" },
{ key: "Update_priv", label: "" },
{ key: "Delete_priv", label: "" },
{ key: "Create_priv", label: "" },
{ key: "Drop_priv", label: "" },
{ key: "Reload_priv", label: "" },
{ key: "Shutdown_priv", label: "" },
{ key: "Process_priv", label: "" },
{ key: "File_priv", label: "" },
{ key: "Grant_priv", label: "" },
{ key: "References_priv", label: "" },
{ key: "Index_priv", label: "" },
{ key: "Alter_priv", label: "" },
{ key: "Show_db_priv", label: "" },
{ key: "Super_priv", label: "" },
{ key: "Create_tmp_table_priv", label: "" },
{ key: "Lock_tables_priv", label: "" },
{ key: "Execute_priv", label: "" },
{ key: "Repl_slave_priv", label: "" },
{ key: "Repl_client_priv", label: "" },
{ key: "Create_view_priv", label: "" },
{ key: "Show_view_priv", label: "" },
{ key: "Create_routine_priv", label: "" },
{ key: "Alter_routine_priv", label: "" },
{ key: "Create_user_priv", label: "" },
{ key: "Event_priv", label: "" },
{ key: "Trigger_priv", label: "" },
{ key: "Create_tablespace_priv", label: "" },
{ key: "ssl_type", label: "" },
{ key: "ssl_cipher", label: "" },
{ key: "x509_issuer", label: "" },
{ key: "x509_subject", label: "" },
{ key: "max_questions", label: "" },
{ key: "max_updates", label: "" },
{ key: "max_connections", label: "" },
{ key: "max_user_connections", label: "" },
{ key: "plugin", label: "" },
{ key: "authentication_string", label: "" },
{ key: "password_expired", label: "" },
{ key: "password_last_changed", label: "" },
{ key: "password_lifetime", label: "" },
{ key: "account_locked", label: "" },
{ key: "id", label: "" },
{ key: "name", label: "" },
{ key: "password", label: "" },
{ key: "access_token", label: "" },
{ key: "role", label: "" },
{ key: "id", label: "" },
{ key: "type", label: "" },
{ key: "user_name", label: "" },
{ key: "user_password", label: "" },














{ key: "user_code", label: "" },
{ key: "role_code", label: "" },
{ key: "create_date", label: "" },




