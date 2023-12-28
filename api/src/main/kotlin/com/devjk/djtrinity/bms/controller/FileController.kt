package com.devjk.djtrinity.bms.controller

import com.devjk.djtrinity.bms.response.BmsHeaderResponse
import com.devjk.djtrinity.bms.response.BmsResponse
import com.devjk.djtrinity.bms.service.FileService
import com.devjk.djtrinity.common.BaseResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
@RequestMapping("/bms")
class FileController(
    private val fileService: FileService
) {

    @PostMapping("/sync")
    fun sync(): ResponseEntity<BaseResponse<Unit>> {
        fileService.syncWithDb()
        return ResponseEntity.ok().body(BaseResponse.success())
    }

    @GetMapping("/list")
    fun listAll(): ResponseEntity<List<BmsHeaderResponse>> {
        val response = fileService.getBmsListAll()
        return ResponseEntity.ok().body(response)
    }

    @GetMapping("/{nodeId}")
    fun parseBms(@PathVariable nodeId: Long): ResponseEntity<BmsResponse> {
        val response = fileService.parseBms(nodeId)
        return ResponseEntity.ok().body(response)
    }
}