package api

import (
	"mayfly-go/base/ctx"
	"mayfly-go/server/devops/application"
	"mayfly-go/server/devops/domain/entity"
)

type Index struct {
	ProjectApp application.Project
	MachineApp application.Machine
	DbApp      application.Db
	RedisApp   application.Redis
}

func (i *Index) Count(rc *ctx.ReqCtx) {
	rc.ResData = map[string]interface{}{
		"projectNum": i.ProjectApp.Count(new(entity.Project)),
		"machineNum": i.MachineApp.Count(new(entity.Machine)),
		"dbNum":      i.DbApp.Count(new(entity.Db)),
		"redisNum":   i.RedisApp.Count(new(entity.Redis)),
	}
}
