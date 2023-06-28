import { dateFormat } from '@/common/utils/date';

export class TableColumn {

    /**
     * 属性字段
     */
    prop: string;

    /**
     * 显示表头
     */
    label: string;

    /**
     * 是否自动计算宽度
     */
    autoWidth: boolean = true;

    /**      
     * 最小宽度
     */
    minWidth: number | string;

    /**
     * 插槽名
     */
    slot: string;

    showOverflowTooltip: boolean = true;

    sortable: boolean = false;

    type: string;

    width: number | string;

    fixed: any;

    align: string = "center"

    formatFunc: Function

    show: boolean = true

    constructor(prop: string, label: string) {
        this.prop = prop;
        this.label = label;
    }

    static new(prop: string, label: string): TableColumn {
        return new TableColumn(prop, label)
    }

    setMinWidth(minWidth: number | string): TableColumn {
        this.minWidth = minWidth
        this.autoWidth = false;
        return this;
    }

    setSlot(slot: string): TableColumn {
        this.slot = slot
        return this;
    }

    setFormatFunc(func: Function): TableColumn {
        this.formatFunc = func;
        return this;
    }

    /**
     * 为时间字段，则使用默认时间格式函数
     * @returns this
     */
    isTime(): TableColumn {
        this.setFormatFunc(dateFormat)
        return this;
    }

    fixedRight(): TableColumn {
        this.fixed = "right";
        return this;
    }

    fixedLeft(): TableColumn {
        this.fixed = "left";
        return this;
    }


    /**
     * 
     * @param str 字符串
     * @param tableData 表数据
     * @param label 表头label也参与宽度计算
     * @returns 列宽度
     */
    static flexColumnWidth = (str: any, label: string, tableData: any) => {
        // str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);

        str = str + '';
        let columnContent = '';
        if (!tableData || !tableData.length || tableData.length === 0 || tableData === undefined) {
            return;
        }
        if (!str || !str.length || str.length === 0 || str === undefined) {
            return;
        }
        // 获取该列中最长的数据(内容)
        let index = 0;
        for (let i = 0; i < tableData.length; i++) {
            if (!tableData[i][str]) {
                continue;
            }
            const now_temp = tableData[i][str] + '';
            const max_temp = tableData[index][str] + '';
            if (now_temp.length > max_temp.length) {
                index = i;
            }
        }
        columnContent = tableData[index][str] + '';
        const contentWidth: number = TableColumn.getContentWidth(columnContent);
        // 获取label的宽度，取较大的宽度
        const columnWidth: number = TableColumn.getContentWidth(label) + 30;
        const flexWidth: number = contentWidth > columnWidth ? contentWidth : columnWidth;
        return flexWidth + 'px';
    };

    /**
     * 获取内容所需要占用的宽度
    */
    static getContentWidth = (content: any): number => {
        if (!content) {
            return 50;
        }
        // 以下分配的单位长度可根据实际需求进行调整
        let flexWidth = 0;
        for (const char of content) {
            if (flexWidth > 500) {
                break;
            }
            if ((char >= '0' && char <= '9') || (char >= 'a' && char <= 'z')) {
                // 小写字母、数字字符
                flexWidth += 9.3;
                continue;
            }
            if (char >= 'A' && char <= 'Z') {
                flexWidth += 9;
                continue;
            }
            if (char >= '\u4e00' && char <= '\u9fa5') {
                // 如果是中文字符，为字符分配16个单位宽度
                flexWidth += 20;
            } else {
                // 其他种类字符
                flexWidth += 8;
            }
        }
        if (flexWidth > 400) {
            // 设置最大宽度
            flexWidth = 400;
        }
        return flexWidth;
    };
}


export class TableQuery {

    /**
     * 属性字段
     */
    prop: string;

    /**
     * 显示表头
     */
    label: string;

    /**
     * 查询类型，text、select、date
     */
    type: string;

    /**
     * select可选值
     */
    options: any;

    /**
     * 插槽名
     */
    slot: string;


    constructor(prop: string, label: string) {
        this.prop = prop;
        this.label = label;
    }

    static new(prop: string, label: string): TableQuery {
        return new TableQuery(prop, label)
    }

    static text(prop: string, label: string): TableQuery {
        const tq = new TableQuery(prop, label)
        tq.type = 'text';
        return tq;
    }

    static select(prop: string, label: string): TableQuery {
        const tq = new TableQuery(prop, label)
        tq.type = 'select';
        return tq;
    }

    static date(prop: string, label: string): TableQuery {
        const tq = new TableQuery(prop, label)
        tq.type = 'date';
        return tq;
    }

    static slot(prop: string, label: string, slotName: string): TableQuery {
        const tq = new TableQuery(prop, label)
        tq.slot = slotName;
        return tq;
    }

    setOptions(options: any): TableQuery {
        this.options = options;
        return this
    }
}