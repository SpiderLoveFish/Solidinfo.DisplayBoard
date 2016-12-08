
//自动播放信息
function topScroll() {
    var $child = document.getElementById("left-div"),
    $clonechild = document.createTextNode($child.innerText);

    var action = function () {
        var $wrap1 = document.getElementById("scroll-left"),
            
            $childWidth = $child.offsetWidth;
        if ($wrap1.scrollLeft >= $childWidth) {

            $wrap1.scrollLeft = 0;

        } else {

            $wrap1.scrollLeft++;

        };

    };

    $child.appendChild($clonechild);

    setInterval(action, 30);

};

topScroll();


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

    show_num(123, ".hours i", 42);
    show_num(456, ".total i", 42);
    show_num(481, ".mass i", 44);
    show_num(153, ".material i", 44);
    show_num(163, ".beat i", 44);

});
var nums = [124, 284, 509, 298, 430]
var temp = 0;
//获取后台数据
function getdata() {
    var s = temp % 5;
    var status = temp % 6;
    show_num(nums[s], ".beat i", 44);
    var data1 = {
        Real: {
            InDay: temp,
            InLastHour: s,
        },
        Standard: {
            InDay: temp + 5,
            InLastHour: status,
        }
    };
    var data2 = {
        Effciency: {
            InDay: temp % 120,
            InLastHour: temp % 30,
        },
        PPH: {
            InDay: temp % 100,
            InLastHour: temp % 20,
        }
    };
    FlushChart(data1, data2);
    Abc("U1", status);
    temp++;
    //$.ajax({ 
    //    url: 'data.php', 
    //    type: 'POST', 
    //    dataType: "json", 
    //    cache: false, 
    //    timeout: 10000, 
    //    error: function(){}, 
    //    success: function(data){ 
    //        show_num(data.count); 
    //    } 
    //   }); 
};
function show_num(n, selector, height) {

    var it = $(selector),
        len = String(n).length;

    for (var i = 0; i < len; i++) {

        var num = String(n).charAt(i),
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

$(function () {
    InitBarChart();
    getdata();
    setInterval('getdata()', 3000);//每隔3秒执行一次 
});

var horizontalBarChartData = {
    labels: ["最近小时", "当日累计"],
    datasets: [{
        label: '实际',
        backgroundColor: "rgba(0,255,0,0.5)",
        data: [80, 90]
    },
    {
        label: '标准',
        backgroundColor: "rgba(0,0,255,0.5)",
        data: [90, 92]
    }]
};
var leftChart;
var rightChart;
function FlushChart(data1, data2) {
    leftChart.series[0].setData([data1.Real.InDay, data1.Standard.InDay]);
    leftChart.series[1].setData([data1.Real.InLastHour, data1.Standard.InLastHour]);

    rightChart.series[0].setData([data2.Effciency.InDay, data2.Effciency.InLastHour]);
    rightChart.series[1].setData([data2.PPH.InDay, data2.PPH.InLastHour]);
}

function InitBarChart() {
    $('#LeftCanvas').highcharts({
        chart: {
            type: 'bar',
            backgroundColor: '#cccccc'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: ['最近小时1', '当日累计'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null,
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: 'millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            x: -20,
            y: 0,
            borderWidth: 0,
            backgroundColor: '#ccc',
            shadow: false
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '实际',
            data: [107, 31]
        }, {
            name: '标准',
            data: [133, 156]
        }]
    });
    leftChart = $('#LeftCanvas').highcharts();

    $('#RightCanvas').highcharts({
        chart: {
            type: 'column',
            backgroundColor: '#cccccc'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: ['效率', 'PPH'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null,
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: 'millions'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                }
            },
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            x: -20,
            y: 0,
            borderWidth: 0,
            backgroundColor: '#ccc',
            shadow: false
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '最近小时',
            data: [107, 31]
        }, {
            name: '当日累计',
            data: [133, 156]
        }]
    });
    rightChart = $('#RightCanvas').highcharts();
}