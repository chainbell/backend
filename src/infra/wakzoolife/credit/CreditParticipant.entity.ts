/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CreditCategoryEntity } from './creditCategory.entity';

@Entity({ name: 'CreditParticipant' })
export class CreditParticipantEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => CreditCategoryEntity, (category) => category.participants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryCode' }) // 외래 키를 명시적으로 설정
  category: CreditCategoryEntity;

}

