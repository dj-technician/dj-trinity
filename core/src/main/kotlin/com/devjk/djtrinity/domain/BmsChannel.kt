package com.devjk.djtrinity.domain

import java.util.*

enum class BmsChannel(val value: String, val description: String) {
    BACKGROUND("01", "배경음 채널"),
    BAR_SHORTEN("02", "마디 단축 채널"),
    BPM("03", "BPM 채널"),
    BGA("04", "BGA 채널"),
    BM98("05", "BM98 확장 채널"),
    POOR_BGA("06", "Poor BGA 채널"),
    BGA_LAYER("07", "BGA 레이어 채널"),
    BPM_EXTENDED("08", "확장 BPM 채널"),
    SEQUENCE_STOP("09", "시퀀스 정지 채널"),
    PLAYER1_1("11", "PLAYER 1, 1번 건반"),
    PLAYER1_2("12", "PLAYER 1, 2번 건반"),
    PLAYER1_3("13", "PLAYER 1, 3번 건반"),
    PLAYER1_4("14", "PLAYER 1, 4번 건반"),
    PLAYER1_5("15", "PLAYER 1, 5번 건반"),
    PLAYER1_6("16", "PLAYER 1, 턴테이블"),
    PLAYER1_7("17", "PLAYER 1, 패달"),
    PLAYER1_8("18", "PLAYER 1, 6번 건반"),
    PLAYER1_9("19", "PLAYER 1, 7번 건반"),
    PLAYER2_1("21", "PLAYER 2, 1번 건반"),
    PLAYER2_2("22", "PLAYER 2, 2번 건반"),
    PLAYER2_3("23", "PLAYER 2, 3번 건반"),
    PLAYER2_4("24", "PLAYER 2, 4번 건반"),
    PLAYER2_5("25", "PLAYER 2, 5번 건반"),
    PLAYER2_6("26", "PLAYER 2, 턴테이블"),
    PLAYER2_7("27", "PLAYER 2, 패달"),
    PLAYER2_8("28", "PLAYER 2, 6번 건반"),
    PLAYER2_9("29", "PLAYER 2, 7번 건반"),
    PLAYER1_TP_1("31", "PLAYER 1, 투명노트1"),
    PLAYER1_TP_2("32", "PLAYER 1, 투명노트2"),
    PLAYER1_TP_3("33", "PLAYER 1, 투명노트3"),
    PLAYER1_TP_4("34", "PLAYER 1, 투명노트4"),
    PLAYER1_TP_5("35", "PLAYER 1, 투명노트5"),
    PLAYER1_TP_6("36", "PLAYER 1, 투명노트6"),
    PLAYER1_TP_7("37", "PLAYER 1, 투명노트7"),
    PLAYER1_TP_8("38", "PLAYER 1, 투명노트8"),
    PLAYER1_TP_9("39", "PLAYER 1, 투명노트9"),
    PLAYER2_TP_1("41", "PLAYER 2, 투명노트1"),
    PLAYER2_TP_2("42", "PLAYER 2, 투명노트2"),
    PLAYER2_TP_3("43", "PLAYER 2, 투명노트3"),
    PLAYER2_TP_4("44", "PLAYER 2, 투명노트4"),
    PLAYER2_TP_5("45", "PLAYER 2, 투명노트5"),
    PLAYER2_TP_6("46", "PLAYER 2, 투명노트6"),
    PLAYER2_TP_7("47", "PLAYER 2, 투명노트7"),
    PLAYER2_TP_8("48", "PLAYER 2, 투명노트8"),
    PLAYER2_TP_9("49", "PLAYER 2, 투명노트9"),
    PLAYER1_LN_1("51", "PLAYER 1, 롱노트1"),
    PLAYER1_LN_2("52", "PLAYER 1, 롱노트2"),
    PLAYER1_LN_3("53", "PLAYER 1, 롱노트3"),
    PLAYER1_LN_4("54", "PLAYER 1, 롱노트4"),
    PLAYER1_LN_5("55", "PLAYER 1, 롱노트5"),
    PLAYER1_LN_6("56", "PLAYER 1, 롱노트6"),
    PLAYER1_LN_7("57", "PLAYER 1, 롱노트7"),
    PLAYER1_LN_8("58", "PLAYER 1, 롱노트8"),
    PLAYER1_LN_9("59", "PLAYER 1, 롱노트9"),
    PLAYER2_LN_1("61", "PLAYER 2, 롱노트1"),
    PLAYER2_LN_2("62", "PLAYER 2, 롱노트2"),
    PLAYER2_LN_3("63", "PLAYER 2, 롱노트3"),
    PLAYER2_LN_4("64", "PLAYER 2, 롱노트4"),
    PLAYER2_LN_5("65", "PLAYER 2, 롱노트5"),
    PLAYER2_LN_6("66", "PLAYER 2, 롱노트6"),
    PLAYER2_LN_7("67", "PLAYER 2, 롱노트7"),
    PLAYER2_LN_8("68", "PLAYER 2, 롱노트8"),
    PLAYER2_LN_9("69", "PLAYER 2, 롱노트9"),
    PLAYER1_LM_1("D1", "PLAYER 1, 랜드마인1"),
    PLAYER1_LM_2("D2", "PLAYER 1, 랜드마인2"),
    PLAYER1_LM_3("D3", "PLAYER 1, 랜드마인3"),
    PLAYER1_LM_4("D4", "PLAYER 1, 랜드마인4"),
    PLAYER1_LM_5("D5", "PLAYER 1, 랜드마인5"),
    PLAYER1_LM_6("D6", "PLAYER 1, 랜드마인6"),
    PLAYER1_LM_7("D7", "PLAYER 1, 랜드마인7"),
    PLAYER1_LM_8("D8", "PLAYER 1, 랜드마인8"),
    PLAYER1_LM_9("D9", "PLAYER 1, 랜드마인9"),
    PLAYER2_LM_1("E1", "PLAYER 2, 랜드마인1"),
    PLAYER2_LM_2("E2", "PLAYER 2, 랜드마인2"),
    PLAYER2_LM_3("E3", "PLAYER 2, 랜드마인3"),
    PLAYER2_LM_4("E4", "PLAYER 2, 랜드마인4"),
    PLAYER2_LM_5("E5", "PLAYER 2, 랜드마인5"),
    PLAYER2_LM_6("E6", "PLAYER 2, 랜드마인6"),
    PLAYER2_LM_7("E7", "PLAYER 2, 랜드마인7"),
    PLAYER2_LM_8("E8", "PLAYER 2, 랜드마인8"),
    PLAYER2_LM_9("E9", "PLAYER 2, 랜드마인9");

    companion object {
        fun from(value: String): BmsChannel {
            return Arrays.stream(entries.toTypedArray())
                .filter { it.value == value }
                .findFirst()
                .orElseThrow { RuntimeException("no available channel : $value") }
        }
    }

    fun isPlayerType(): Boolean {
        val code = value[0]
        return code == '1' || code == '2' || code == '3' || code == '4' || code == '5' || code == '6' || code == 'D' || code == 'E'
    }

    fun isSecondPlayerType(): Boolean {
        val code = value[0]
        return code == '2' || code == '4' || code == '6' || code == 'E'
    }
}