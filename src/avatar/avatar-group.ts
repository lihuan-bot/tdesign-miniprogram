import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import avatarGroupProps from './avatar-group-props';

const { prefix } = config;
const name = `${prefix}-avatar-group`;

@wxComponent()
export default class AvatarGroup extends SuperComponent {
  properties = avatarGroupProps;

  data = {
    classPrefix: name,
    hasChild: true,
    length: 0,
  };

  options = {
    multipleSlots: true,
  };

  relations = {
    './avatar': {
      type: 'descendant' as 'descendant',
      linked(this: AvatarGroup) {
        this.children = this.getRelationNodes('./avatar');
      },
    },
  };

  ready() {
    this.setData({
      length: this.children.length,
    });
    this.handleHasChild(this.children, this.data.hasChild);
    this.handleChildSlot(this.properties.max, this.children, this.handleChildMax);
    this.handleChildSize(this.properties.size, this.children);
    this.handleChildCascading(this.properties.cascading, this.children);
  }

  methods = {
    /**
     * @param children avatar-group的所有avatar子节点
     * @param hasChild 是否为子节点（slot插槽以及默认的avatar折叠元素没有parent）
     * @description
     */
    handleHasChild(children, hasChild) {
      children.forEach((child) => {
        child.updateIsChild(hasChild);
      });
    },
    /**
     *
     * @param max 最大avatar数量
     * @param children avatar-group的所有avatar子节点
     * @param f handleChildMax函数
     * @description 判断是否传入自定义折叠元素
     */
    handleChildSlot(max, children, f) {
      const query = this.createSelectorQuery();
      const slotName = `.${this.data.classPrefix}__collapse--slot`;
      query.select(slotName).boundingClientRect();
      query.exec((res) => {
        const isSlot = !!res[0].width;
        f(max, children, isSlot);
      });
    },

    /**
     *
     * @param max 最大avatar数量
     * @param children avatar-group的所有avatar子节点
     * @param isSlotElement 是否传入自定义折叠元素（res[0].width不为空表示传入）
     * @description avatar-group的最大数量处理
     *              + 如果未传入自定义折叠元素，当超出max数量时，显示默认折叠元素
     */
    handleChildMax(max, children, isSlotElement) {
      const len = children.length;
      if (!max || max > len) return;

      const slotElement = isSlotElement ? children.pop() : '';
      const leftChildren = children.splice(max, len - max, isSlotElement && slotElement);

      leftChildren.forEach((child) => {
        child.updateShow();
      });
    },

    /**
     * @param size 尺寸，优先级低于avatar自身设置的size
     * @param children avatar-group的所有avatar子节点
     * @description 更新avatar节点的size属性
     */
    handleChildSize(size, children) {
      if (!size) return;
      children.forEach((child) => {
        child.updateSize(size);
      });
    },

    /**
     * @param cascading 层叠关系
     * @param children avatar-group的所有avatar子节点
     * @description 右侧图片在上可用css直接实现，左侧图片在上，通过设置z-index实现
     */
    handleChildCascading(cascading, children) {
      if (cascading === 'right-up') return;

      const defaultZIndex = 100;
      children.forEach((child, index) => {
        child.updateCascading(defaultZIndex - index * 10);
      });
    },
  };
}
