/**课程观看 环形进度条 */
let course_finish_progress = echarts.init(document.getElementById("course_progress"));
let course_finish_progress_option = {
	title: {
		text: "63%",
		textStyle: {
			color: "#01c4a3",
			fontSize: 40,
			fontWeight: "normal",
		},
		subtext: "已完成",
		subtextStyle: {
			color: "#646668",
			fontSize: 12,
		},
		itemGap: 0, // 主副标题距离
		left: "center",
		top: "center",
	},
	angleAxis: {
		max: 100, // 满分
		clockwise: false, // 逆时针
		// 隐藏刻度线
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			show: false,
		},
		splitLine: {
			show: false,
		},
	},
	radiusAxis: {
		type: "category",
		// 隐藏刻度线
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			show: false,
		},
		splitLine: {
			show: false,
		},
	},
	polar: {
		center: ["50%", "50%"],
		radius: "185px", //图形大小
	},
	series: [
		{
			type: "bar",
			data: [
				{
					name: "course_finish_persent",
					value: 63, //极坐标角度
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
								{
									offset: 0,
									color: "#aaf14f",
								},
								{
									offset: 1,
									color: "#0acfa1",
								},
							]),
						},
					},
				},
			],
			coordinateSystem: "polar",
			roundCap: true,
			barWidth: 25,
			barGap: "-100%", // 两环重叠
			z: 2,
		},
		{
			// 灰色环
			type: "bar",
			data: [
				{
					value: 100,
					itemStyle: {
						color: "#ccf5e9",
						shadowColor: "rgba(0, 0, 0, 0.2)",
						shadowBlur: 8,
						shadowOffsetY: 4,
					},
				},
			],
			coordinateSystem: "polar",
			roundCap: true,
			barWidth: 25,
			barGap: "-100%", // 两环重叠
			z: 1,
		},
	],
};
course_finish_progress.setOption(course_finish_progress_option); // 使用刚指定的配置项和数据显示图表。

/**作业完成 环形进度条 */
let exam_progress = echarts.init(document.getElementById("exam_progress"));
let exam_progress_option = {
	title: {
		text: "31%",
		textStyle: {
			color: "#578ee4",
			fontSize: 40,
			fontWeight: "normal",
		},
		subtext: "已完成",
		subtextStyle: {
			color: "#646668",
			fontSize: 12,
		},
		itemGap: 0, // 主副标题距离
		left: "center",
		top: "center",
	},
	angleAxis: {
		max: 100, // 满分
		clockwise: false, // 逆时针
		// 隐藏刻度线
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			show: false,
		},
		splitLine: {
			show: false,
		},
	},
	radiusAxis: {
		type: "category",
		// 隐藏刻度线
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			show: false,
		},
		splitLine: {
			show: false,
		},
	},
	polar: {
		center: ["50%", "50%"],
		radius: "185px", //图形大小
	},
	series: [
		{
			type: "bar",
			data: [
				{
					name: "exam_finish_persent",
					value: 31, //极坐标角度
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
								{
									offset: 0,
									color: "#36D1DC",
								},
								{
									offset: 1,
									color: "#5B86E5",
								},
							]),
						},
					},
				},
			],
			coordinateSystem: "polar",
			roundCap: true,
			barWidth: 25,
			barGap: "-100%", // 两环重叠
			z: 2,
		},
		{
			// 灰色环
			type: "bar",
			data: [
				{
					value: 100,
					itemStyle: {
						color: "#bdebff",
						shadowColor: "rgba(0, 0, 0, 0.2)",
						shadowBlur: 8,
						shadowOffsetY: 4,
					},
				},
			],
			coordinateSystem: "polar",
			roundCap: true,
			barWidth: 25,
			barGap: "-100%", // 两环重叠
			z: 1,
		},
	],
};
exam_progress.setOption(exam_progress_option);

/**成绩折线图 */
let grade_line = echarts.init(document.getElementById("grade_chart"));
let my_scores = [89, 93, 76, 84, 90, 91, 88, 79, 90, 94, 84, 81, 80, 91, 83, 97];
let avg_scores = [77, 83, 79, 85, 74, 75, 80, 77, 73, 81, 79, 70, 82, 80, 75, 77];
let max_scores = [100, 93, 97, 100, 95, 98, 90, 100, 96, 94, 100, 91, 97, 99, 95, 100];
let x_course_count = [];
for (let i = 1; i <= 16; i++) {
	x_course_count.push(i + "讲-1");
}
let grade_line_option = {
	tooltip: {
		trigger: "axis",
	},
	legend: {
		data: ["我的成绩", "平均分", "最高分"],
		icon: "react", // 设置legend的图标样式
		top: "0", // 设置legend的位置
		itemGap: 40, // 设置legend之间的间距
	},
	grid: {
		left: "3%",
		right: "4%",
		bottom: "3%",
		containLabel: true,
	},
	xAxis: {
		type: "category",
		boundaryGap: false,
		data: x_course_count,
	},
	yAxis: {
		type: "value",
	},
	dataZoom: [
		{
			type: "inside",
			show: true,
			xAxisIndex: [0],
			start: 1,
			end: 100,
		},
	],
	series: [
		{
			smooth: "true",
			name: "我的成绩",
			type: "line",
			symbol: "circle",
			symbolSize: 8,
			itemStyle: {
				color: "#2ec7c9", // 折线颜色
			},
			markPoint: {
				// 标注
				label: {
					normal: {
						textStyle: {
							color: "#fff",
						},
					},
				},
				data: [
					{
						type: "max",
						name: "最大值",
					},
					{
						type: "min",
						name: "最小值",
					},
				],
			},
			areaStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{
						offset: 0,
						color: "rgba(46, 199, 201, 0.1)",
					},
					{
						offset: 1,
						color: "rgba(46, 199, 201, 0)",
					},
				]),
			},
			data: my_scores,
		},
		{
			name: "平均分",
			type: "line",
			symbol: "circle",
			symbolSize: 8,
			itemStyle: {
				color: "#b6a2de", // 折线颜色
			},
			data: avg_scores,
		},
		{
			name: "最高分",
			type: "line",
			symbol: "circle",
			symbolSize: 8,
			itemStyle: {
				color: "#ffb980", // 折线颜色
			},
			data: max_scores,
		},
	],
};
grade_line.setOption(grade_line_option);

/** 知识点进度条 */
let key_progress = echarts.init(document.getElementById("key_point_progress"));
let data = [80, 93, 56, 20, 100];
let key_points = ["导数单调性", "导数连续性", "积分", "导数运算", "积分运算"];
let valdata = ["80/100", "93/100", "56/100", "20/100", "100/100"];
let barColor = { blue: "#0acfa1", orange: "#F5B65E", red: "#F55E6C" };
let key_progress_option = {
	grid: {
		left: '15%',
		right: '15%',
		top: 0,
		},
	tooltip: {
		trigger: "axis",
		axisPointer: {
			type: "none",
		},
		formatter: function (params) {
			return params[0].name + " : " + params[0].value + "%";
		},
	},
	xAxis: {
		show: false,
	},
	yAxis: [
		{
			show: true,
			data: key_points,
			inverse: true,
			axisLine: {
				show: false,
			},
			splitLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				fontSize: 14,
				color: "#333",
				margin: 50,
			},
		},
		{
			show: true,
			inverse: true,
			data: valdata,
			axisLabel: {
				textStyle: {
					fontSize: 14,
					color: "#333",
				},
				margin: 50,
			},
			axisLine: {
				show: false,
			},
			splitLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
		},
	],
	series: [
		{
			name: "框",
			type: "bar",
			yAxisIndex: 1,
			barGap: "-100%",
			data: [100, 100, 100, 100, 100],
			barWidth: 20,
			itemStyle: {
				normal: {
					color: "#f5f5f5",
					borderWidth: 3,
					barBorderRadius: 15,
				},
			},
		},
		{
			name: "条",
			type: "bar",
			yAxisIndex: 0,
			data: data,
			barWidth: 20,
			itemStyle: {
				normal: {
					barBorderRadius: 20,
					color: function (params) {
						return params.data >= 85 ? barColor.blue : params.data >= 60 ? barColor.orange : barColor.red;
					},
				},
			},
			label: {
				normal: {
					show: true,
					position: "inside",
					formatter: "{c}%",
					color: "#fff",
				},
			},
		},
	],
};
key_progress.setOption(key_progress_option);
let key_progres_height = key_points.length * 80;
key_progress.resize({ height: key_progres_height });
