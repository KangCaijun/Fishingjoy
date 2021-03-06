﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
module table {
	/**
	 * FILE: 子弹.xlsx SHEET: Sheet1
	 */
	export class TableBulletConfig {
		sign: number;
		/**
		 * 碰撞范围
		 */
		colliderAry: TableBulletConfig.ColliderAryItem[];
		/**
		 * 图片组
		 */
		imageAry: TableBulletConfig.ImageAryItem[];
		/**
		 * 速度
		 */
		speed: number;
		/**
		 * 等级
		 */
		level: number;
		/**
		 * 发射间隔
		 */
		interval: number;
		/**
		 * 极速状态下的发射间隔
		 */
		fastInterval: number;

		GetType(): string { return 'table.TableBulletConfig'; }
	}
	export module TableBulletConfig {
		export class ColliderAryItem {
			posX: number;
			posY: number;
			radius: number;
		}
	}
	export module TableBulletConfig {
		export class ImageAryItem {
			keyName: string;
			sourceName: string;
			offsetX: number;
			offsetY: number;
			scaleX: number;
			scaleY: number;
		}
	}
}
