/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-11-24 10:58:05
 * */

import { TdTabsProps } from './type';
const props: TdTabsProps = {
  /** 动画效果设置。其中 duration 表示动画时长 */
  animation: {
    type: Object,
  },
  /** 组件类名，分别用于设置 组件外层元素 等类名 */
  externalClasses: {
    type: Array,
  },
  /** 选项卡位置 */
  placement: {
    type: String,
    value: 'top',
  },
  /** 是否展示底部激活线条 */
  showBottomLine: {
    type: Boolean,
    value: true,
  },
  /** 激活的选项卡值 */
  value: {
    type: String,
    optionalTypes: [Number],
  },
};

export default props;
