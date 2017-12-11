define(['jquery', 'app', 'moment', 'bootstrap-datepicker', 'bootstrap-daterangepicker', 'bootstrap-datetimepicker'], function ($, App, moment, datepicker) {

    var ComponentsDateTimePickers = function () {
        var handleDatePickers = function () {
            $('.date-picker').datepicker({
                rtl: App.isRTL(),
                orientation: 'left',
                autoclose: true
            });
        };

        var handleTimePickers = function () {

            $('.timepicker-default').timepicker({
                autoclose: true,
                showSeconds: true,
                minuteStep: 1
            });

            $('.timepicker-no-seconds').timepicker({
                autoclose: true,
                minuteStep: 5
            });

            $('.timepicker-24').timepicker({
                autoclose: true,
                minuteStep: 5,
                showSeconds: false,
                showMeridian: false
            });

            // handle input group button click
            $('.timepicker').parent('.input-group').on('click', '.input-group-btn', function (e) {
                e.preventDefault();
                $(this).parent('.input-group').find('.timepicker').timepicker('showWidget');
            });
        };

        var handleDateRangePickers = function () {

            $('#defaultrange').daterangepicker({
                opens: App.isRTL() ? 'left' : 'right',
                format: 'MM/DD/YYYY',
                separator: ' to ',
                startDate: moment().subtract(29, 'days'),
                endDate: moment(),
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                minDate: '01/01/2012',
                maxDate: '12/31/2018'
            }, function (start, end) {
                $('#defaultrange input').val(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            });

            $('#defaultrange_modal').daterangepicker({
                opens: App.isRTL() ? 'left' : 'right',
                format: 'MM/DD/YYYY',
                separator: ' to ',
                startDate: moment().subtract(29, 'days'),
                endDate: moment(),
                minDate: '01/01/2012',
                maxDate: '12/31/2018'
            }, function (start, end) {
                $('#defaultrange_modal input').val(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            });

            // this is very important fix when daterangepicker is used in modal. in modal when daterange picker is opened and mouse clicked anywhere bootstrap modal removes the modal-open class from the body element.
            // so the below code will fix this issue.
            $('#defaultrange_modal').on('click', function () {
                if ($('#daterangepicker_modal').is(':visible') && $('body').hasClass('modal-open') == false) {
                    $('body').addClass('modal-open');
                }
            });

            $('#reportrange').daterangepicker({
                opens: App.isRTL() ? 'left' : 'right',
                startDate: moment().subtract(29, 'days'),
                endDate: moment(),
                //minDate: '01/01/2012',
                //maxDate: '12/31/2014',
                dateLimit: {
                    days: 60
                },
                showDropdowns: true,
                showWeekNumbers: true,
                timePicker: false,
                timePickerIncrement: 1,
                timePicker12Hour: true,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                buttonClasses: ['btn'],
                applyClass: 'green',
                cancelClass: 'default',
                format: 'MM/DD/YYYY',
                separator: ' to ',
                locale: {
                    applyLabel: 'Apply',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: 'Custom Range',
                    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    firstDay: 1
                }
            }, function (start, end) {
                $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            });
            //Set the initial state of the picker label
            $('#reportrange span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
        };

        var handleDatetimePicker = function () {

            $('.form_datetime').datetimepicker({
                autoclose: true,
                bootcssVer: 3,
                // isRTL: App.isRTL(),
                format: 'dd MM yyyy - hh:ii'
            });

            $('.form_advance_datetime').datetimepicker({
                isRTL: App.isRTL(),
                format: 'dd MM yyyy - hh:ii',
                autoclose: true,
                todayBtn: true,
                startDate: '2013-02-14 10:00',
                pickerPosition: App.isRTL() ? 'bottom-right' : 'bottom-left',
                minuteStep: 10
            });

            $('.form_meridian_datetime').datetimepicker({
                isRTL: App.isRTL(),
                format: 'dd MM yyyy - HH:ii P',
                showMeridian: true,
                autoclose: true,
                pickerPosition: App.isRTL() ? 'bottom-right' : 'bottom-left',
                todayBtn: true
            });

            $('body').removeClass('modal-open'); // fix bug when inline picker is used in modal
        };

        var handleClockfaceTimePickers = function () {

            $('.clockface_1').clockface();

            $('#clockface_2').clockface({
                format: 'HH:mm',
                trigger: 'manual'
            });

            $('#clockface_2_toggle').click(function (e) {
                e.stopPropagation();
                $('#clockface_2').clockface('toggle');
            });

            $('#clockface_2_modal').clockface({
                format: 'HH:mm',
                trigger: 'manual'
            });

            $('#clockface_2_modal_toggle').click(function (e) {
                e.stopPropagation();
                $('#clockface_2_modal').clockface('toggle');
            });

            $('.clockface_3').clockface({
                format: 'H:mm'
            }).clockface('show', '14:30');
        };

        return {
            //main function to initiate the module
            init: function () {
                handleDatePickers();
                // handleTimePickers();
                handleDatetimePicker();
                handleDateRangePickers();
                // handleClockfaceTimePickers();
            }
        };
    }();
    return ComponentsDateTimePickers;
});
