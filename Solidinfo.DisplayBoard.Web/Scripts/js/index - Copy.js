function changeNews(news) {
    var $child = document.getElementById("left-div");
    $child.textContent = news;
}
var topScrollTimer;
//自动播放信息
function topScroll(news) {

    var $child = document.getElementById("left-div");
    $child.textContent = news;
    var $childWidth = $child.offsetWidth;

    var action = function () {

        var $wrap1 = document.getElementById("scroll-left");

        $wrap1.style.width = ($childWidth < 550) ? ($childWidth - 10) + "px" : 550 + "px";

        if ($wrap1.scrollLeft >= $childWidth) {

            $wrap1.scrollLeft = 0;

        } else {

            $wrap1.scrollLeft++;

        };

    };

    $child.appendChild(document.createTextNode($child.innerText));
    if (topScrollTimer != undefined) {
        clearInterval(topScrollTimer);
    }
    topScrollTimer = setInterval(action, 30);

};

topScroll("默认消息");


//顶部时间
function getTime() {

    var $date = document.getElementById("date"),
        $time = document.getElementById("time"),
        timer = setInterval(function () {

            var mydate = new Date(),
                     y = mydate.getFullYear(),
                     m = mydate.getMonth() + 1,
                     d = mydate.getDate(),
                     h = mydate.getHours(),
                   min = mydate.getMinutes(),
                     s = mydate.getSeconds();

            s = s < 10 ? "0" + s : s;
            min = min < 10 ? "0" + min : min;
            h = h < 10 ? "0" + h : h;

            $date.innerHTML = y + "-" + m + "-" + d;
            $time.innerHTML = h + ":" + min + ":" + s;

        }, 1000);

};

getTime();


//向右滚动
function rightScroll() {

    var $wrap1 = document.getElementById("wrap-img"),
        $child = document.getElementById("scroll-right"),
        $clonechild = document.createElement("i"),
        $i = $child.getElementsByTagName("i")[0],
        timer = null,
        $childWidth = $child.offsetWidth,
        action = function () {

            if ($wrap1.scrollLeft > 0) {

                $wrap1.scrollLeft--;

            } else {

                $wrap1.scrollLeft = $childWidth;

            };

        };

    $clonechild.innerHTML = $i.innerHTML,

    $child.appendChild($clonechild);

    timer = setInterval(action, 10);

};

rightScroll();




//数字滚动
$(function () {

    show_num(0, ".hours i", 42);
    show_num(0, ".total i", 42);
    show_num(0, ".mass i", 44);
    show_num(0, ".material i", 44);
    show_num(0, ".beat i", 44);
});
var nums = [124, 284, 509, 298, 430]
var temp = 0;
var lastNews;
var lastDeviceModel;
var ajaxUrl = "Home/GetData";
//获取后台数据
function getdata() {
    //var s = temp % 5;
    //var status = temp % 6;
    //show_num(nums[s], ".beat i", 44);
    //Abc("U1", status);
    //temp++;
    $.ajax({
        url: ajaxUrl,
        type: 'POST',
        dataType: "json",
        cache: false,
        timeout: 5000,
        error: function () { },
        success: function (data) {
            if (data != undefined) {
                if (leftChart != undefined && rightChart != undefined) {
                    FlushChart(data.ProductionStatistics, data.EfficiencyStatistics);
                }
                else {
                    InitBarChart(data.ProductionStatistics, data.EfficiencyStatistics);
                }
                show_num(data.WarningCount.InLastHour, ".hours i", 42);
                show_num(data.WarningCount.InDay, ".total i", 42);
                show_num(data.WarningCount.QuantityWarning, ".mass i", 44);
                show_num(data.WarningCount.MaterialWarning, ".material i", 44);
                show_num(data.WarningCount.BeatWarning, ".beat i", 44);
                Abc("U1", data.DeviceStatus.U1);
                Abc("U2", data.DeviceStatus.U2);
                Abc("U3", data.DeviceStatus.U3);
                Abc("U4", data.DeviceStatus.U4);
                Abc("U5", data.DeviceStatus.U5);
                Abc("U6", data.DeviceStatus.U6);
                Abc("U7", data.DeviceStatus.U7);
                Abc("U8", data.DeviceStatus.U8);
                Abc("z1", data.DeviceStatus.Z1);
                Abc("z2", data.DeviceStatus.Z2);
                Abc("z3", data.DeviceStatus.Z3);
                if (lastNews != data.LastNews) {
                    lastNews = data.LastNews;
                    topScroll(lastNews);
                }
                if (lastDeviceModel != data.DeviceModel)
                {
                    lastDeviceModel = data.DeviceModel;
                    var showText = lastDeviceModel;
                    if (lastDeviceModel.length > 8)
                    {
                        showText = lastDeviceModel.substr(0, 8);
                    }
                    $("#data-num").attr("title", lastDeviceModel);
                    $("#data-num").text(showText);
                }
                
            }
        }
    });
};
function show_num(n, selector, height) {

    var it = $(selector);
    var str = String(n);
    var len = str.length;
    for (var i = str.length; i < 3; i++) {
        str = "0" + str;
    }

    for (var i = 0; i < str.length; i++) {

        var num = str.charAt(i),
            y = -parseInt(num) * height, //y轴位置 
            obj = $(selector).eq(i);

        obj.animate({ //滚动动画 

            backgroundPosition: '(0 ' + String(y) + 'px)'

        }, 'slow', 'swing', function () { }
        );
    }
};

function Abc(o, status) {
    var className = "status-" + (status + 1);

    $("#" + o).removeAttr("class").addClass(className);
}
var leftChart;
var rightChart;
var footChart;
$(function () {
    getdata();

    setInterval('getdata()', 5000);//每隔3秒执行一次 
});

function FlushChart(data1, data2) {
    leftChart.series[0].setData([data1.JHSL.InDay, data1.Real.InLastHour, data1.Real.InDay]);
    leftChart.series[1].setData(['', data1.Standard.InLastHour, data1.Standard.InDay]);

    rightChart.series[0].setData([data2.JHDCL.InDay, data2.Effciency.InDay, data2.JHDCL.InLastHour]);
    //rightChart.series[1].setData(['', '', '']);

    footChart.series[0].setData([data2.PPH.InLastHour/100]);
    footChart.series[1].setData([data2.PPH.InDay / 100]);
}

function InitBarChart(data1, data2) {
    var num1, num2, num3, num4;
    if (data1 == undefined) {
        num1 = num2 = num3 = num4 = 0; jhsl = 0;
    }
    else {
        jhsl = data1.JHSL.InDay;

        num1 = data1.Real.InLastHour;
        num2 = data1.Real.InDay;
        num3 = data1.Standard.InLastHour;
        num4 = data1.Standard.InDay;
    }
    var num5, num6, num7, num8;
    if (data2 == undefined) {
        num5 = num6 = num7 = num8 = 0;
        jhdcl = xl = ztl = 0
    }
    else {
        jhdcl = data2.JHDCL.InDay;
        ztl = data2.JHDCL.InLastHour;
        num5 = data2.Effciency.InLastHour;
        num6 = data2.PPH.InLastHour
        num7 = data2.Effciency.InDay;
        num8 = data2.PPH.InDay;
        xl = data2.Effciency.InDay;//效率是总的效率
    }

    $('#LeftCanvas').highcharts({
        chart: {
            type: 'bar',
            backgroundColor: '#3c3c3c'
        },
        title: {
            text: null
        },
        colors: ["#87bb4f", "#00b0f0"],
        xAxis: {
            categories: ['计划数量', '最近小时', '当日累计'],
            title: {
                text: null
            },
            tickColor: '#585858',
            lineColor: '#585858',
            labels: {
                style: {
                    fontSize: '16px',
                    fontFamily: 'Microsoft Yahei',
                    color: '#ccc'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null,
                align: 'high'
            },
            gridLineColor: '#585858',
            labels: {
                align: "center",
                overflow: 'justify',
                style: {
                    fontSize: '16px',
                    fontFamily: 'Arial',
                    color: '#ccc'
                }
            }
        },
        tooltip: {
            valueSuffix: '辆'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    style: {
                        'fontSize': '28px',
                        'color': '#fff',
                        'fontFamily': 'Arial'
                    }
                }
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            x: 10,
            y: 0,
            borderWidth: 0,
            backgroundColor: '#3c3c3c',
            shadow: false,
            symbolWidth: 11,
            symbolHeight: 11,
            itemHoverStyle: {
                color: '#ccc'
            },
            itemStyle: {
                'fontSize': '18px',
                'fontFamily': 'Microsoft Yahei',
                'fontWeight': 'normal',
                'color': '#ccc'
            }
        },
        credits: {
            enabled: false
        },
        series: [

              {
                  name: '实际PCS',
                  data: [{ y: jhsl, color: '#87bb4f', borderColor: '#87bb4f' }, { y: num1, color: '#87bb4f', borderColor: '#87bb4f' }, { y: num2, color: '#87bb4f', borderColor: '#87bb4f' }]
              }, {
                  name: '标准PCS',
                  data: [{}, { y: num3, color: '#00b0f0', borderColor: '#00b0f0' }, { y: num4, color: '#00b0f0', borderColor: '#00b0f0' }]
              }]
    });
    leftChart = $('#LeftCanvas').highcharts();
    $('#RightCanvas').highcharts({
        chart: {
            type: 'column',
            backgroundColor: '#3c3c3c'
        },
        colors: ["#87bb4f", "#00b0f0"],
        title: {
            text: null
        },
        xAxis: {
            categories: ['计划达成率%', '效率%', '直通率%'],
            title: {
                text: null
            },
            tickColor: '#585858',
            lineColor: '#585858',
            labels: {
                style: {
                    fontSize: '10px',
                    fontFamily: '黑体',
                    color: '#FFFFFF'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null,
                align: 'high'
            },
            gridLineColor: '#585858',
            labels: {
                overflow: 'justify',
                style: {
                    fontSize: '16px',
                    fontFamily: 'Arial',
                    color: '#ccc'
                }
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    style: {
                        'fontSize': '18px',
                        'color': '#fff',
                        'fontFamily': 'Arial'
                    }
                }
            },
            bar: {
                dataLabels: {
                    enabled: true,
                    style: {
                        'fontSize': '18px',
                        'color': '#fff',
                        'fontFamily': 'Arial'
                    }
                }
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            x: 10,
            y: -40,
            borderWidth: 0,
            backgroundColor: '#3c3c3c',
            shadow: false,
            symbolWidth: 11,
            symbolHeight: 11,
            itemHoverStyle: {
                color: '#ccc'
            },
            itemStyle: {
                'fontSize': '18px',
                'fontFamily': 'Microsoft Yahei',
                'fontWeight': 'normal',
                'color': '#ccc',
            }
        },
        credits: {
            enabled: false
        },
        series: [
             {
                 name: '实际%',
                 data: [{ y: jhdcl, color: '#87bb4f', borderColor: '#87bb4f' }, { y: xl, color: '#87bb4f', borderColor: '#87bb4f' }, { y: ztl, color: '#87bb4f', borderColor: '#87bb4f' }]
             } ]
    });
    rightChart = $('#RightCanvas').highcharts();
    $('#FootCanvas').highcharts({
        chart: {
            type: 'bar',
            backgroundColor: '#3c3c3c'
        },
        title: {
            text: null
        },
        colors: ["#87bb4f", "#00b0f0"],
        xAxis: {
            categories: ['PPH'],
            title: {
                text: null
            },
            tickColor: '#585858',
            lineColor: '#585858',
            labels: {
                style: {
                    fontSize: '16px',
                    fontFamily: 'Microsoft Yahei',
                    color: '#ccc'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null,
                align: 'high'
            },
            gridLineColor: '#585858',
            labels: {
                align: "center",
                overflow: 'justify',
                style: {
                    fontSize: '16px',
                    fontFamily: 'Arial',
                    color: '#ccc'
                }
            }
        },
        tooltip: {
            valueSuffix: '辆/人'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    style: {
                        'fontSize': '10px',
                        'color': '#fff',
                        'fontFamily': 'Arial'
                    }
                }
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: -40,
            borderWidth: 0,
            backgroundColor: '#3c3c3c',
            shadow: false,
            symbolWidth: 11,
            symbolHeight: 11,
            itemHoverStyle: {
                color: '#ccc'
            },
            itemStyle: {
                'fontSize': '0px',
                'fontFamily': 'Microsoft Yahei',
                'fontWeight': 'normal',
                'color': '#ccc'
            }
        },
        credits: {
            enabled: false
        },
        series: [

            {
                name: '实际',
                data: [{ y: num6 / 100, color: '#87bb4f', borderColor: '#87bb4f' }]
            }, {
                name: '标准',
                data: [{ y: num8 / 100, color: '#00b0f0', borderColor: '#00b0f0' }]
            }]
    });
    footChart = $('#FootCanvas').highcharts();
}